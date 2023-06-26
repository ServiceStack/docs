<main class="mt-8 mx-auto max-w-7xl px-4 sm:mt-12">
    <div class="text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">File Blazor </span>
            <span class="block text-indigo-600 xl:inline">Managed File Upload Example</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">ServiceStack's 
            <code class="bg-blue-50 text-blue-500 py-1 px-2 rounded">FileUploadFeature</code>
            provides an easy and flexible way to create API services backed by either popular cloud solutions like AWS S3, Azure Blob Storage, or your own file system.
        </p>
    </div>
</main>
<div class="relative py-8 bg-white overflow-hidden">
    <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto">
            <h1>
                <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">Introducing</span>
                <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <a href="https://github.com/NetCoreApps/FileBlazor">NetCoreApps/FileBlazor</a>                    
                </span>
            </h1>
            <p class="mt-8 text-xl text-gray-500 leading-8">
                <a href="https://github.com/NetCoreApps/FileBlazor">NetCoreApps/FileBlazor</a> is a Blazor Demo utilizing the 
                <code class="bg-blue-50 text-blue-500 py-1 px-2 rounded">FileUploadFeature</code>
                plugin to provide an easy and flexible solution for quickly creating APIs services for uploading/downloading files to a variety of storage types.
            </p>
        </div>
    </div>
</div>

<figure class="m-2">
    <img src="/images/locode/files/fileupload-config-plugin.png" alt="">
    <figcaption>Configuration of IVirtualFiles and FileUploadPlugin</figcaption>
</figure>

By utilizing **AutoQuery** and **Locode** features, you also get a generated UI to use for back office staff or to use for prototyping. In this demo we configure three different storage types which integrate directly with your own database tables.

- AWS S3 Bucket
- Azure Blob Storage Container
- Local Application File System

<figure class="m-2">
    <img src="/images/locode/files/fileupload-datamodel.png" alt="">
    <figcaption>Define your database tables to store file metadata.</figcaption>
</figure>

The FileUploadFeature plugin uses the ServiceStack IVirtualFiles abstraction where multiple named providers can be used and referenced against your database model. Your own database stores metadata about each file including a reference to HTTP file path where the file where it can be downloaded.

## Driven by your request DTOs

Your table data for the files in this demo are then shared using **AutoQuery** services. AutoQuery provides the overridable service implementation to manage this data, this is where you can link your FileUploadFeature to specific table data using the `UploadTo` attribute.

<figure class="m-2">
    <img src="/images/locode/files/fileupload-create-dto.png" alt="">
    <figcaption>Define your request Data Transfer Objects (DTOs) and use `UploadTo` with the related named UploadLocation.</figcaption>
</figure>

## Upload Files Using Locode

ServiceStack Locode App integrates with the FileUploadFeature plugin to enable a way to manage your files straight away.

<figure>
    <img src="/images/locode/files/locode-app-create-s3.png" alt="">
    <figcaption>Instant upload form using Locode App.</figcaption>
</figure>

## Overridable filters in the plugin

The UploadFeaturePlugin provides overridable options to better control upload/download rules. In this demo, `Public`, `Team` and `Private` files are stored in single table for each upload location.

Access rules are configured for each of the upload locations independently using the following plugin options.

- **readAccessRole** - Can limit read access to specific user roles
- **resolvePath** - Control how the upload path is created
- **validateUpload** - Filter upload requests
- **validateDownload** - Filter download requests

## Integrate API services with a custom UI

Since AutoQuery services are ServiceStack services, they benefit from being highly interoperable. This FileBlazor demo uses native Blazor components to upload to the generated API services providing a user friendly drag and drop interface.

Navigate to the public 
<a href="/aws/public">S3</a>, 
<a href="/azure/public">Azure</a> or
<a href="/filesystem/public">File System</a> 
file galleries on the left to preview files without authenticating, or login to see the different file access types and upload files yourself.

<div class="my-8 flex justify-center">
    <a href="https://github.com/NetCoreApps/FileBlazor" 
        class="hover:text-black inline-flex no-underline hover:no-underline items-center px-6 py-3 border border-gray-300 shadow text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" fill="currentColor"></path>
            </g>
        </svg><span class="mx-2">FileBlazor on GitHub</span>
    </a>
</div>