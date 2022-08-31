// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./BusinessNFT.sol";


contract serviceNFT is ERC721URIStorage {

    BusinessNFT private _BusinessNFT;
    uint256 serviceId = 1;

    constructor(address businessContract) ERC721("Service NFT", "SFT")  {
        setBusinessContract(businessContract);
    }



    function setBusinessContract(address _businessContract) public {
        _BusinessNFT = BusinessNFT(_businessContract);
    }

    struct Service {
        uint256 serviceId;
        uint256 price;
        address owner;
        string serviceDescription;
    }

    Service [] newService;

    mapping(address => mapping(uint256 => uint256[])) BusinessToService;
    mapping(uint256 => string) serviceName;

    function makeService(uint256 servicePrice, string memory _serviceDescription) public {
        require(_BusinessNFT.ownsABusiness(msg.sender) == true, "You cannot create a service as you do not own a BusinessNFT");

        _mint(msg.sender, serviceId);
        Service memory addService = Service(serviceId, servicePrice, msg.sender, _serviceDescription);
        uint256 businessId = _BusinessNFT.getBusinessId(msg.sender);
        BusinessToService[msg.sender][businessId].push(serviceId);
        newService.push(addService);
        serviceName[serviceId] = _serviceDescription;
        serviceId++;

    }

    function buyService(uint256 _serviceId) public payable {
        // Here we can describe the price, but this is the place where we actually should start thinking abot the DeCo as money will start to flow to different addresses here

    }

    function checkService(address _address) public view returns(uint256[] memory){
        uint256 _businessNumber = _BusinessNFT.getBusinessId(msg.sender);

        return BusinessToService[_address][_businessNumber];
    }

    //function checkServices
    // This function will check what Services are available for this business at the moment
    
}
