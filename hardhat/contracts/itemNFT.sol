// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./BusinessNFT.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract itemNFT is ERC721URIStorage {
    BusinessNFT private _BusinessNFT;
    uint256 serviceId = 0;
    address payable productVault;

    constructor(address businessContract) ERC721("Service NFT", "SFT") {
        setBusinessContract(businessContract);
    }

    function setBusinessContract(address _businessContract) public {
        _BusinessNFT = BusinessNFT(_businessContract);
    }

    struct Service {
        uint256 serviceId;
        uint256 price;
        address owner;
        // string _serviceName;
        string serviceDescription;
        bool sold;
        string tokenURI;
        string businessName;
    }

    Service[] newService;

    mapping(uint256 => Service[]) ServicesOfBusiness; // This tracks which business has which Services
    mapping(uint256 => string) serviceName;
    mapping(address => Service[]) public userServices; // your Service
    mapping(uint256 => uint256) incomeOfBusiness;
    mapping(uint256 => uint256) soldNFTs;
    mapping(uint256 => Service[]) userSoldServices;
    mapping(address => Service[]) userAllSoldServices;

    function makeService(
        uint256 servicePrice,
        string memory _serviceDescription,
        string memory tokenURI,
        uint256 businessId
    ) public {
        require(
            _BusinessNFT.ownsABusiness(msg.sender) == true,
            "You cannot create a service as you do not own a BusinessNFT"
        );

        string memory businessName = _BusinessNFT.getbusinessName(businessId);

        _mint(msg.sender, serviceId);
        _setTokenURI(serviceId, tokenURI);
        Service memory addService = Service(
            serviceId,
            servicePrice,
            msg.sender,
            _serviceDescription,
            false,
            tokenURI,
            businessName
        );
        ServicesOfBusiness[businessId].push(addService);
        newService.push(addService);
        serviceName[serviceId] = _serviceDescription;
        userServices[msg.sender].push(addService);
        serviceId++;
    }

    function buyService(uint256 _businessId, uint256 _serviceId) public {
        require(
            newService[_serviceId].owner != msg.sender,
            "You cannot buy your own service"
        );
        require(
            newService[_serviceId].sold == false,
            "This service has already been bought or id unavailable"
        );

        // for(uint256 i = 0; i < ServicesOfBusiness[_businessId].length; i++){
        //             if(ServicesOfBusiness[_businessId][i].serviceId == _serviceId){
        //                 ServicesOfBusiness[_businessId][i].sold = true;
        //                 break;
        //             }
        //         }
        newService[_serviceId].sold = true;
        Service memory newSoldService = Service(
            newService[_serviceId].serviceId,
            newService[_serviceId].price,
            newService[_serviceId].owner,
            newService[_serviceId].serviceDescription,
            newService[_serviceId].sold,
            newService[_serviceId].tokenURI,
            newService[_serviceId].businessName
        );
        userSoldServices[_businessId].push(newSoldService);
        userAllSoldServices[msg.sender].push(newSoldService);
        //Service memory deletedService = deleteService(_serviceId);
        incomeOfBusiness[_businessId] += newService[_serviceId].price;
        soldNFTs[_businessId]++;

        _deleteServiceBusiness(_businessId, _serviceId);
        // deleteService(_serviceId);
        // _burn(_serviceId);
        //userServices[msg.sender].push(deleteService(_serviceId));
    }

    function getIncomeOfBusiness(uint256 _businessId)
        public
        view
        returns (uint256)
    {
        return incomeOfBusiness[_businessId];
    }

    function getPriceForAService(uint256 _id) public view returns (uint256) {
        return newService[_id].price;
    }

    function getOwnerOfService(uint256 _id) public view returns (address) {
        return newService[_id].owner;
    }

    function deleteService(uint256 _deletedId) public returns (Service memory) {
        Service memory founded;
        bool found = false;
        for (uint256 i = 0; i < newService.length - 1; i++) {
            if (newService[i].serviceId == _deletedId) {
                founded = newService[i];
                found = true;
                continue;
            }
            if (found) {
                newService[i - 1] = newService[i];
            }
        }
        newService.pop();
        return founded;
    }

    function _deleteServiceBusiness(uint256 _businessId, uint256 _serviceId)
        public
        returns (Service memory)
    {
        Service memory toBeDeleted;
        bool founded = false;
        for (uint256 i = 0; i < ServicesOfBusiness[_businessId].length; i++) {
            if (ServicesOfBusiness[_businessId][i].serviceId == _serviceId) {
                toBeDeleted = ServicesOfBusiness[_businessId][i];
                founded = true;
                continue;
            }
            if (founded) {
                ServicesOfBusiness[_businessId][i - 1] = ServicesOfBusiness[
                    _businessId
                ][i];
            }
        }
        ServicesOfBusiness[_businessId].pop();
        return toBeDeleted;
    }

    function getService(uint256 _serviceId)
        public
        view
        returns (
            uint256,
            string memory,
            bool
        )
    {
        return (
            newService[_serviceId].serviceId,
            newService[_serviceId].serviceDescription,
            newService[_serviceId].sold
        );
    }

    // function getServicesForOwner() public view returns (Service[] memory){
    //     return userServices[msg.sender];
    // }

    // function printAllServices() public view returns (Service[] memory){
    //     return newService;
    // }

    function listMyServices(uint256 _businessId)
        public
        view
        returns (Service[] memory)
    {
        return ServicesOfBusiness[_businessId]; // This is actually listServicesById!!!
    }

    function listAllServices() public view returns (Service[] memory) {
        return newService;
    }

    function getSoldNFTs(uint256 _serviceId) public view returns (uint256) {
        return soldNFTs[_serviceId];
    }

    function getSoldServices(uint256 _businessId) public view returns (Service[] memory){
        return userSoldServices[_businessId];
    }

    function getAllSoldServices() public view returns (Service[] memory){
        return userAllSoldServices[msg.sender];
    }
}

