export default process.env.NODE_ENV === 'development' ? {
  net_version: "regtest",
  AdoptionArtifact: require('./contracts/regtest/Adoption.json'),
} : {
  net_version: "test",
  AdoptionArtifact: require('./contracts/test/Adoption.json'),
}
