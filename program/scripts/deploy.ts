import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';

async function deployProgram() {
    // Connect to devnet
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    
    // Read the keypair file or create a new one
    let programKeypair: Keypair;
    const keypairPath = path.join(__dirname, '../program-keypair.json');
    
    try {
        const keypairData = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'));
        programKeypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    } catch (error) {
        programKeypair = Keypair.generate();
        fs.writeFileSync(keypairPath, JSON.stringify(Array.from(programKeypair.secretKey)));
    }
    
    console.log('Program ID:', programKeypair.publicKey.toString());
    
    // Read the compiled program
    const programPath = path.join(__dirname, '../target/deploy/blockvest_program.so');
    const program = fs.readFileSync(programPath);
    
    // Create deploy transaction
    const programAccount = await connection.getAccountInfo(programKeypair.publicKey);
    
    if (programAccount === null) {
        // Calculate rent-exempt balance
        const space = program.length;
        const rentExemptBalance = await connection.getMinimumBalanceForRentExemption(space);
        
        // Create account transaction
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: programKeypair.publicKey,
                newAccountPubkey: programKeypair.publicKey,
                lamports: rentExemptBalance,
                space: space,
                programId: new PublicKey('BPFLoaderUpgradeab1e11111111111111111111111'),
            })
        );
        
        // Send transaction
        await sendAndConfirmTransaction(connection, transaction, [programKeypair]);
    }
    
    // Deploy program
    const deployConfig = {
        bytecode: program,
        skipPreflight: true,
    };
    
    try {
        await connection.deployProgram(programKeypair.publicKey, deployConfig);
        console.log('Program deployed successfully!');
    } catch (error) {
        console.error('Failed to deploy program:', error);
    }
}

deployProgram().catch(console.error);
