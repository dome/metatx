module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  await deploy("TokenSender", {
    from: deployer,
    log: true,
    deterministicDeployment: false   
  });
};
module.exports.tags = ["TokenSender"];
