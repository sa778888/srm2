// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Git {
    struct DeployDetails {
        string url;
        address publisher;
    }

    mapping(string => DeployDetails) public deployments;

    function publishDeployment(string memory url) public {
        DeployDetails memory newDeployment = DeployDetails({
            url: url,
            publisher: msg.sender
        });

        deployments[url] = newDeployment;
    }

    function getDeployment(string memory url) public view returns (string memory, address) {
        DeployDetails memory deployment = deployments[url];
        return (deployment.url, deployment.publisher);
    }
}