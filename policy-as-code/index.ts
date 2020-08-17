import * as aws from "@pulumi/aws";
import { PolicyPack, validateResourceOfType } from "@pulumi/policy";

new PolicyPack("aws-typescript", {
    policies: [
        {
            name: "rds-password-secret",
            description: "Ensure RDS cluster password is secret",
            enforcementLevel: "mandatory",
            validateResource: validateResourceOfType(aws.rds.Cluster, (resource, args, reportViolation) => {
                if (!args.opts.additionalSecretOutputs?.includes("masterPassword")) {
                    reportViolation("`masterPassword` must be marked secret with 'additionalSecretOutputs'.");
                }
            }),
        }
    ],
});
