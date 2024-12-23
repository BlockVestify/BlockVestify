// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BondContract {
    struct Bond {
        string name;
        uint256 value;
        uint256 purchaseTime;
        uint256 maturityTime;
        uint256 interestRate;
        address owner;
        bool isActive;
    }

    mapping(uint256 => Bond) public bonds;
    uint256 public nextBondId;
    
    event BondCreated(uint256 bondId, address owner, uint256 value);
    event BondSold(uint256 bondId, address owner, uint256 value);

    function createBond(
        string memory name,
        uint256 value,
        uint256 maturityTime,
        uint256 interestRate
    ) public payable returns (uint256) {
        require(msg.value == value, "Must send exact bond value");
        
        uint256 bondId = nextBondId++;
        bonds[bondId] = Bond({
            name: name,
            value: value,
            purchaseTime: block.timestamp,
            maturityTime: maturityTime,
            interestRate: interestRate,
            owner: msg.sender,
            isActive: true
        });

        emit BondCreated(bondId, msg.sender, value);
        return bondId;
    }

    function getBond(uint256 bondId) public view returns (
        string memory name,
        uint256 value,
        uint256 purchaseTime,
        uint256 maturityTime,
        uint256 interestRate,
        address owner,
        bool isActive,
        uint256 currentValue
    ) {
        Bond storage bond = bonds[bondId];
        require(bond.owner != address(0), "Bond does not exist");
        
        return (
            bond.name,
            bond.value,
            bond.purchaseTime,
            bond.maturityTime,
            bond.interestRate,
            bond.owner,
            bond.isActive,
            calculateCurrentValue(bondId)
        );
    }

    function calculateCurrentValue(uint256 bondId) public view returns (uint256) {
        Bond storage bond = bonds[bondId];
        require(bond.owner != address(0), "Bond does not exist");
        
        if (!bond.isActive) {
            return 0;
        }

        uint256 timeElapsed = block.timestamp - bond.purchaseTime;
        uint256 totalTime = bond.maturityTime - bond.purchaseTime;
        
        if (timeElapsed >= totalTime) {
            // Bond has matured
            return bond.value + (bond.value * bond.interestRate / 100);
        }
        
        // Calculate pro-rated interest
        uint256 progress = (timeElapsed * 100) / totalTime;
        uint256 interest = (bond.value * bond.interestRate * progress) / 10000;
        return bond.value + interest;
    }

    function sellBond(uint256 bondId) public {
        Bond storage bond = bonds[bondId];
        require(bond.owner == msg.sender, "Only bond owner can sell");
        require(bond.isActive, "Bond is not active");
        
        uint256 currentValue = calculateCurrentValue(bondId);
        bond.isActive = false;
        
        payable(msg.sender).transfer(currentValue);
        emit BondSold(bondId, msg.sender, currentValue);
    }

    function getBondsByOwner(address owner) public view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < nextBondId; i++) {
            if (bonds[i].owner == owner) {
                count++;
            }
        }
        
        uint256[] memory ownerBonds = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextBondId; i++) {
            if (bonds[i].owner == owner) {
                ownerBonds[index] = i;
                index++;
            }
        }
        
        return ownerBonds;
    }
}
