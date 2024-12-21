// server.js
const express = require('express');
const app = express();
const port = 7051;
const fabricClient = require('hyperledger-fabric-client');

app.use(express.json());

// Initialize Hyperledger Fabric client
async function initFabricClient() {
    const user = 'User1';
    const orgMSPID = 'Org1MSP';

    // Load the admin identity and set it as the current user
    await fabricClient.loadFromConfig('/path/to/network-config.yaml');
    const channel = fabricClient.getChannel('mychannel');

    return { channel };
}

// Example endpoint to fetch assets from the ledger
app.get('/assets/:id', async (req, res) => {
    try {
        const assetId = req.params.id;
        const { channel } = await initFabricClient();

        // Fetch data from Hyperledger Fabric network using chaincode or SDK
        const assetData = await channel.queryByChaincode({
            targets: [], // Replace with your peer details
            chaincodeId: 'your-chaincode-id',
            fcn: 'getAsset',
            args: [assetId]
        });
        res.json(assetData[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch asset' });
    }
});

// Example endpoint to set assets on the ledger
app.post('/assets', async (req, res) => {
    try {
        const { id, value } = req.body;
        const { channel } = await initFabricClient();

        // Set data on Hyperledger Fabric network using chaincode or SDK
        await channel.invokeChaincode({
            targets: [], // Replace with your peer details
            chaincodeId: 'your-chaincode-id',
            fcn: 'setAsset',
            args: [id, value]
        });
        res.status(201).json({ message: 'Asset set successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to set asset' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
