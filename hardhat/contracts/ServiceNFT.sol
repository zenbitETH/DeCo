// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./BusinessNFT.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract productNFT is ERC721URIStorage{

    BusinessNFT private _BusinessNFT;
    uint256 serviceId = 0;
    address payable productVault;

    constructor(address businessContract) ERC721("Service NFT", "SFT")  {
        setBusinessContract(businessContract);
    }

    function setBusinessContract(address _businessContract) public {
        _BusinessNFT = BusinessNFT(_businessContract);
    }

    struct Service {
        uint256 serviceId;
        uint256 price;
        address payable owner;
        // string _serviceName;
        string serviceDescription;
        bool sold;
        string tokenURI;
    }

    Service [] newService;

    mapping(uint256 => Service[]) ServicesOfBusiness; // This tracks which business has which Services
    mapping(uint256 => string) serviceName;
    mapping(address => Service[]) public userServices; // your Service
    mapping(uint256 => uint256) incomeOfBusiness;
    mapping(uint256 => uint256) soldNFTs;


    function makeService(uint256 servicePrice, string memory _serviceDescription, string memory tokenURI, uint256 businessId) public {
        require(_BusinessNFT.ownsABusiness(msg.sender) == true, "You cannot create a service as you do not own a BusinessNFT");
        _mint(msg.sender, serviceId);
        _setTokenURI(serviceId, tokenURI);
        Service memory addService = Service(serviceId, servicePrice, payable(msg.sender), _serviceDescription, false, tokenURI);
        ServicesOfBusiness[businessId].push(addService);
        newService.push(addService);
        serviceName[serviceId] = _serviceDescription;
        userServices[msg.sender].push(addService);
        serviceId++;
    }

    function buyService(uint256 _serviceId, uint256 _businessId) public {
        require(newService[_serviceId].owner != msg.sender, "You cannot buy your own service");
        require(newService[_serviceId].sold == false, "This service has already been bought or id unavailable");

        ServicesOfBusiness[_businessId][_serviceId].sold = true;
        newService[_serviceId].sold = true;
        
        //Service memory deletedService = deleteService(_serviceId);
        incomeOfBusiness[_businessId] += newService[_serviceId].price;
        soldNFTs[_businessId]++;
        //deleteService(_serviceId);
        _burn(_serviceId);
        //userServices[msg.sender].push(deleteService(_serviceId));
    }

    function getIncomeOfBusiness(uint256 _businessId) public view returns (uint256) {
        return incomeOfBusiness[_businessId];
    }

    function getPriceForAService(uint256 _id) public view returns(uint256){
        return newService[_id].price;
    }

    function getOwnerOfService(uint256 _id) public view returns (address payable) {
        return newService[_id].owner;
    }

    function deleteService(uint256 _deletedId) public returns(Service memory) {
        Service memory founded;
        bool found = false;
        for(uint256 i = 0; i < newService.length -1; i++){
            if(newService[i].serviceId == _deletedId){
                founded = newService[i];
                found = true;
                continue;
            }
            if(found){
                newService[i - 1] = newService[i];
            }
        }
        newService.pop();
        return founded;
    }
    
    function getService(uint256 _serviceId) public view returns(uint256, string memory, bool){
        return(newService[_serviceId].serviceId,
               newService[_serviceId].serviceDescription,
               newService[_serviceId].sold);
    }

    // function getServicesForOwner() public view returns (Service[] memory){
    //     return userServices[msg.sender];
    // }

    // function printAllServices() public view returns (Service[] memory){
    //     return newService;
    // }

    function listMyServices(uint256 _businessId) public view returns (Service[] memory){
        return ServicesOfBusiness[_businessId]; // This is actually listServicesById!!!
    }

    function getSoldNFTs(uint256 _serviceId) public view returns(uint256){
        return soldNFTs[_serviceId];
    }
}
