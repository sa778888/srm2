// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ResearchPlatform is ERC721, ERC721URIStorage {
    struct User {
        address userAddress;
        uint256[] publishedDatasets;
        uint256 inaccuracyReports;
    }
    struct Paper {
        string uri; // URI of the paper on IPFS
        string title;
        string paperAbstract;
        string dateOfPublication;
        string[] authors;
        address owner;
        uint256 citations;
        uint256 inaccuracyReports;
    }
    struct Feedback {
        address reporter;
        string comment;
        bool isPlagiarism;
        bool isInaccuracy;
    }

    struct Dataset {
        string uri;
        string title;
        string description;
        string dateOfPublication;
        string[] keywords;
        address owner;
        address[] collaborators;
    }
    constructor() ERC721("ResearchPlatform", "RP") {}

    mapping(address => User) public users;
    mapping(uint256 => Dataset) public datasets;
    mapping(uint256 => Paper) public papers;
    mapping(uint256 => Feedback[]) public paperFeedbacks;

    uint256 public datasetCount = 0;
    uint256 public paperCount = 0;

    event PaperPublished(uint256 paperId, address owner);
    event UserRegistered(address userAddress);
    event DatasetPublished(uint256 datasetId, address owner);
    event CollaborationRequested(uint256 datasetId, address collaborator);
    event FeedbackSubmitted(uint256 paperId, address reporter);
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    function mintWithTokenURI(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) internal {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
    // function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    //     super._burn(tokenId);
    // }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function registerUser() public {
        User storage user = users[msg.sender];
        user.userAddress = msg.sender;
        emit UserRegistered(msg.sender);
    }
    
    function isUserPresent(address userAddress) public view returns (bool) {
        return users[userAddress].userAddress != address(0);
    }

    function publishDataset(
        string memory uri,
        string memory title,
        string memory description,
        string memory dateOfPublication,
        string[] memory keywords
    ) public {
        datasetCount++;
        Dataset storage dataset = datasets[datasetCount];
        dataset.uri = uri;
        dataset.title = title;
        dataset.description = description;
        dataset.dateOfPublication = dateOfPublication;
        dataset.keywords = keywords;
        dataset.owner = msg.sender;
        users[msg.sender].publishedDatasets.push(datasetCount);
        _mint(msg.sender, datasetCount); // Mint a new NFT for the dataset
        _setTokenURI(datasetCount, uri); // Set the NFT's metadata URI to the IPFS URI
        emit DatasetPublished(datasetCount, msg.sender);
    }

    function publishPaper(
        string memory uri,
        string memory title,
        string memory paperAbstract,
        string memory dateOfPublication,
        string[] memory authors
    ) public {
        paperCount++;
        Paper storage paper = papers[paperCount];
        paper.uri = uri;
        paper.title = title;
        paper.paperAbstract = paperAbstract;
        paper.dateOfPublication = dateOfPublication;
        paper.authors = authors;
        paper.owner = msg.sender;
        _mint(msg.sender, paperCount); // Mint a new NFT for the paper
        _setTokenURI(paperCount, uri); // Set the NFT's metadata URI to the IPFS URI
        emit PaperPublished(paperCount, msg.sender);
    }

    function getDataset(
        uint256 datasetId
    )
        public
        view
        returns (
            string memory title,
            string memory description,
            string memory dateOfPublication,
            string[] memory keywords,
            address owner,
            address[] memory collaborators
        )
    {
        Dataset storage dataset = datasets[datasetId];
        return (
            dataset.title,
            dataset.description,
            dataset.dateOfPublication,
            dataset.keywords,
            dataset.owner,
            dataset.collaborators
        );
    }

    function getUserDatasets(
        address userAddress
    ) public view returns (uint256[] memory) {
        return users[userAddress].publishedDatasets;
    }

    function getPaper(
        uint256 paperId
    )
        public
        view
        returns (
            string memory uri,
            string memory title,
            string memory paperAbs,
            string memory dateOfPublication,
            string[] memory authors,
            address owner,
            uint256 citations
        )
    {
        Paper storage paper = papers[paperId];
        return (
            paper.uri,
            paper.title,
            paper.paperAbstract,
            paper.dateOfPublication,
            paper.authors,
            paper.owner,
            paper.citations
        );
    }

    function citePaper(uint256 paperId) public {
        Paper storage paper = papers[paperId];
        require(paper.owner != address(0), "Paper does not exist");
        paper.citations++;
    }

    function reportPlagiarismOrInaccuracy(
        uint256 paperId,
        string memory comment,
        bool isPlagiarism,
        bool isInaccuracy
    ) public {
        Feedback memory feedback = Feedback({
            reporter: msg.sender,
            comment: comment,
            isPlagiarism: isPlagiarism,
            isInaccuracy: isInaccuracy
        });
        paperFeedbacks[paperId].push(feedback);
        if (isInaccuracy) {
            papers[paperId].inaccuracyReports++;
            users[msg.sender].inaccuracyReports++;
        }
        emit FeedbackSubmitted(paperId, msg.sender);
    }
}
