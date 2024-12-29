use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    sysvar::Sysvar,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Bond {
    pub issuer: Pubkey,
    pub amount: u64,
    pub maturity_date: i64,
    pub interest_rate: u64,
    pub bond_type: String,
    pub is_redeemed: bool,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum BondInstruction {
    CreateBond {
        amount: u64,
        maturity_date: i64,
        interest_rate: u64,
        bond_type: String,
    },
    InvestInBond {
        amount: u64,
    },
    RedeemBond,
}

// Declare the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint implementation
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Blockvest Solana program entrypoint");
    
    let instruction = BondInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;
        
    match instruction {
        BondInstruction::CreateBond { amount, maturity_date, interest_rate, bond_type } => {
            process_create_bond(program_id, accounts, amount, maturity_date, interest_rate, bond_type)
        },
        BondInstruction::InvestInBond { amount } => {
            process_invest_in_bond(accounts, amount)
        },
        BondInstruction::RedeemBond => {
            process_redeem_bond(accounts)
        },
    }
}

fn process_create_bond(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
    maturity_date: i64,
    interest_rate: u64,
    bond_type: String,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let issuer_account = next_account_info(account_info_iter)?;
    let bond_account = next_account_info(account_info_iter)?;
    
    if !issuer_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    let rent = Rent::get()?;
    if !rent.is_exempt(bond_account.lamports(), bond_account.data_len()) {
        return Err(ProgramError::AccountNotRentExempt);
    }
    
    let bond = Bond {
        issuer: *issuer_account.key,
        amount,
        maturity_date,
        interest_rate,
        bond_type,
        is_redeemed: false,
    };
    
    bond.serialize(&mut &mut bond_account.data.borrow_mut()[..])?;
    
    msg!("Bond created successfully");
    Ok(())
}

fn process_invest_in_bond(
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let investor_account = next_account_info(account_info_iter)?;
    let bond_account = next_account_info(account_info_iter)?;
    
    if !investor_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    let mut bond = Bond::try_from_slice(&bond_account.data.borrow())?;
    if bond.is_redeemed {
        return Err(ProgramError::InvalidAccountData);
    }
    
    // Transfer investment amount (implementation depends on token type)
    // For simplicity, we're just validating the account here
    
    msg!("Investment processed successfully");
    Ok(())
}

fn process_redeem_bond(accounts: &[AccountInfo]) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let investor_account = next_account_info(account_info_iter)?;
    let bond_account = next_account_info(account_info_iter)?;
    
    if !investor_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    let mut bond = Bond::try_from_slice(&bond_account.data.borrow())?;
    if bond.is_redeemed {
        return Err(ProgramError::InvalidAccountData);
    }
    
    // Verify maturity date
    let current_timestamp = solana_program::clock::Clock::get()?.unix_timestamp;
    if current_timestamp < bond.maturity_date {
        return Err(ProgramError::InvalidAccountData);
    }
    
    bond.is_redeemed = true;
    bond.serialize(&mut &mut bond_account.data.borrow_mut()[..])?;
    
    msg!("Bond redeemed successfully");
    Ok(())
}
