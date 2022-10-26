---
slug: litestream-templates
title: Litestream Mix Templates
---

The Litestream mix templates can incorporate the use of [Litestream](https://litestream.io) into new ServiceStack project templates, providing an example of automated backup and restore functionality for SQLite applications.

Litestream runs as a dedicated [sidecar](https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar) container watching for updates to your SQLite database, replicating those changes to your configured storage target like AWS S3, Azure Blob Storage, and SFTP.

![](/images/litestream/litestream-mix-diagram-s3.png)

The template provides two files that are designed follow the [Linux SSH deployment using GitHub Actions](/github-action-templates.md) built into some templates.

Just like most of the ServiceStack project templates, it uses a single Linux host with Docker and Docker Compose running an NGINX container with Lets Encrypt companion to handle automated TLS certificate management. This could be on AWS, Azure, DigitalOcean or your own server, the only requirements are that it has SSH access, with Docker and Docker-Compose installed.

![](/images/actions/cloudcraft-host-digram-release-docker-aws.png)

## Docker Compose Template

The `docker-compose-template.yml` uses the `depends_on` and `healthcheck` features of Docker-Compose to ensure a restore takes place before deployment unless a database file already exists locally or is missing on the target storage.

::: info
Ensure you have v2+ of Docker Compose
A compatibility script can be used for `docker-compose` via the following script.
`echo 'docker compose --compatibility "$@"' > /usr/local/bin/docker-compose`
`sudo chmod +x /bin/docker-compose`
:::

```yaml
services:
  MyApp:
    image: ghcr.io/${IMAGE_REPO}:${RELEASE_VERSION}
    depends_on:
      MyApp-litestream:
        condition: service_healthy
    restart: always
    network_mode: bridge
    ports:
      - "80"
    environment:
      VIRTUAL_HOST: ${HOST_DOMAIN}
      LETSENCRYPT_HOST: ${HOST_DOMAIN}
      LETSENCRYPT_EMAIL: ${LETSENCRYPT_EMAIL}
      DEPLOY_API: ${DEPLOY_API}
      DEPLOY_CDN: ${DEPLOY_CDN}
    volumes:
      - MyApp-mydb:/app/App_Data
  MyApp-litestream:
    image: litestream/litestream
    entrypoint: ["/bin/sh", "-c"]
    # Timeout of health check will need to depend on size of db, and speed of network to host.
    healthcheck:
      # There is a first use test needed to ensure virgin first deploy succeeds.
      # test /usr/local/bin/litestream version
      test: /usr/local/bin/litestream restore -if-db-not-exists -if-replica-exists -o /data/app.db s3://${AWS_S3_BUCKET}/MyApp.sqlite
      timeout: 10m
      retries: 1
    command:
      - /usr/local/bin/litestream replicate /data/app.db s3://${AWS_S3_BUCKET}/MyApp.sqlite
```
::: info
Note the use of a 10-minute timeout for the restore process (`timeout: 10m`), this is sufficient for small SQLite databases, however, restore processes should always be tested for their specific use case.
:::


During the GitHub Action release workflow, a Docker Compose YAML file is produced from the template, and copied to the Linux host before calling `docker-compose up` to run the Litestream process and application together.

Since Litestream is tied to deployment and hosting environment, we have made several templates that work with specific templates.
Below is a table matching project templates to mix templates including different storage targets.

| Project Template     | AWS S3                  | Azure Blob Storage        | SFTP (generic)           | 
|----------------------|-------------------------|---------------------------|--------------------------|
| **web**              | litestream-aws          | litestream-azure          | litestream-sftp          | 
| **blazor-tailwind**  | blazor-litestream-aws   | blazor-litestream-azure   | blazor-litestream-sftp   |
| **blazor-wasm**      | blazor-litestream-aws   | blazor-litestream-azure   | blazor-litestream-sftp   |
| **vue-ssg**          | jamstack-litestream-aws | jamstack-litestream-azure | jamstack-litestream-sftp |
| **vue-vite**         | jamstack-litestream-aws | jamstack-litestream-azure | jamstack-litestream-sftp |
| **nextjs**           | jamstack-litestream-aws | jamstack-litestream-azure | jamstack-litestream-sftp |

## GitHub Action Workflow

To automate deployment, creation of additional GitHub Action Secrets is required. Below is a list of the name of the secrets related to the type of storage target used.

For a detailed overview for creating and setting up deployment for a new App from scratch checkout:

<iframe class="video-hd" src="https://www.youtube.com/embed/fY50dWszpw4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Working with AWS S3

| GitHub Secret Name    | Description                                        | Example               |
|-----------------------|----------------------------------------------------|-----------------------|
| AWS_S3_BUCKET         | Name of the S3 bucket for Litestream to target     | my-bucket-name        |
| AWS_ACCESS_KEY_ID     | AWS IAM user Access Key for programmatic access    | AKIAIOSFODNN7EXAMPLE1 |
| AWS_SECRET_ACCESS_KEY | AWS IAM user access secret for programmatic access | abcd1234abcd1234      |

### Working with Azure Blob Storage

| GitHub Secret Name   | Description                                                       | Example                           |
|----------------------|-------------------------------------------------------------------|-----------------------------------|
| AZURE_ACCOUNT_KEY    | Azure account key, accessible under Storage Accounts, Access Keys | tEst123/tEst123/tEst123/tEst123== |
| AZURE_STORAGEACCOUNT | Azure Storage Account name                                        | mystorageaccountname              |
| AZURE_CONTAINER      | Azure Storage Container name                                      | my-storage-container              |


### Working with SFTP

| GitHub Secret Name | Description                      | Example          |
|--------------------|----------------------------------|------------------|
| SFTP_USERNAME      | SFTP Username for authentication | username         |
| SFTP_PASSWORD      | SFTP Password for authentication | password         |
| SFTP_HOST          | SFTP domain name or IP address   | sftp.example.com |
| SFTP_PORT          | SFTP port used to access         | 22               |
