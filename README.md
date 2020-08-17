# example-pulumi-secrets-policy

An example using [Pulumi CrossGuard](https://www.pulumi.com/crossguard/) for policy as code to ensure a database password is _secret_ and will be encrypted in the Pulumi stack state file.

The example uses a few Pulumi features: 
- [Encrypted Secrets](https://www.pulumi.com/docs/intro/concepts/config/#secrets)
 to protected the password provided to the application.
 - [additionalSecretOutputs](https://www.pulumi.com/docs/intro/concepts/programming-model/#additionalsecretoutputs) to ensure the password output from the database is encrypted.
 - [Policy as Code ("CrossGuard")
](https://www.pulumi.com/docs/guides/crossguard/) to ensure `additionalSecretOutputs` is set correctly

## Usage (Local Policy Enforcement)

```
pulumi stack init
pulumi config set clusterPassword --secret
pulumi up --policy-pack policy-as-code
```

## Usage (Server-Side Policy Enforcement)

```
pulumi stack init
pulumi config set clusterPassword --secret
cd policy-as-code
pulumi policy publish <org>
pulumi policy enable aws-typescript latest
cd ..
pulumi up
```
