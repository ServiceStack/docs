---
title: TagInput Component
---

<link rel="stylesheet" href="/css/tailwind-components.css">

<script setup>
import { Icon } from "@iconify/vue"
import { useMetadata } from "@servicestack/vue"
import ApiReference from "../../src/components/ApiReference.vue"
import TagInputExamples from "../../src/gallery/inputs/TagInputExamples.vue"
import metadata from "../../src/gallery/metadata.json"
import { allContacts } from "../../src/gallery/data.ts"
import { UpdateContact } from "../../src/gallery/dtos.ts"

const contact = allContacts[0]

const { setMetadata } = useMetadata()
setMetadata(metadata)

const visibleFields ="firstName,lastName,skills"

const request = new UpdateContact(allContacts[0])

function submit(e) {}
</script>

<Breadcrumbs class="not-prose my-4" home-href="/vue/">
  <Breadcrumb href="/vue/gallery/">gallery</Breadcrumb>
  <Breadcrumb>TagInput</Breadcrumb>
</Breadcrumbs>

The `TagInput` component provides a user friendly control for managing a free-form `List<string>` tags or symbols
which is also supported in declarative Auto Forms using the `[Input(Type="tag")]` attribute as seen in the 
**UpdateContact** example using the [AutoForm components](/vue/gallery/autoform):

```html
<AutoEditForm type="UpdateContact" v-model="contact" formStyle="card" />
```
<AutoEditForm id="updatecontact" data-id="UpdateContact" type="UpdateContact" v-model="contact" formStyle="card" class="not-prose max-w-3xl mb-4" />

Generated from the **UpdateContact** C# Request DTO:

```csharp
public class UpdateContact : IPatchDb<Contact>, IReturn<Contact>
{
    public int Id { get; set; }
    [ValidateNotEmpty]
    public string? FirstName { get; set; }
    [ValidateNotEmpty]
    public string? LastName { get; set; }
    [Input(Type = "file"), UploadTo("profiles")]
    public string? ProfileUrl { get; set; }
    public int? SalaryExpectation { get; set; }
    [ValidateNotEmpty]
    public string? JobType { get; set; }
    public int? AvailabilityWeeks { get; set; }
    public EmploymentType? PreferredWorkType { get; set; }
    public string? PreferredLocation { get; set; }
    [ValidateNotEmpty]
    public string? Email { get; set; }
    public string? Phone { get; set; }
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string>? Skills { get; set; }
    [Input(Type = "textarea")]
    [FieldCss(Field = "col-span-12 text-center", Input = "h-48", Label= "text-xl text-indigo-700")]
    public string? About { get; set; }
}
```

Alternatively `<TagInput>` can be used in Custom Forms directly by binding to a `List<string>` or `string[]` model:

<ApiReference component="TagInput">Custom Form</ApiReference>

```html
<form @submit.prevent="submit">
    <div class="shadow sm:rounded-md bg-white dark:bg-black">
        <div class="relative px-4 py-5 sm:p-6">
            <fieldset>
                <legend class="text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4">
                    TagInput Examples
                </legend>
                <ErrorSummary :except="visibleFields" />
                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-6">
                        <TextInput v-model="request.firstName" />
                    </div>
                    <div class="col-span-6">
                        <TextInput v-model="request.lastName" />
                    </div>
                    <div class="col-span-12">
                        <TagInput v-model="request.skills" label="Technology Skills" 
                            :allowableValues="['c#','servicestack','vue','.net','typescript']" />
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between">
            <div></div>
            <div class="flex justify-end">
                <SecondaryButton class="mr-4">Cancel</SecondaryButton>
                <PrimaryButton type="submit">Submit</PrimaryButton>
            </div>
        </div>
    </div>
</form>
```

<form data-id="TagInputExamples" class="max-w-screen-md not-prose" @submit.prevent="submit">
    <div class="shadow sm:rounded-md bg-white dark:bg-black">
        <div class="relative px-4 py-5 sm:p-6">
            <fieldset>
                <legend class="text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4">
                    TagInput Examples
                </legend>
                <ErrorSummary :except="visibleFields" />
                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-6">
                        <TextInput v-model="request.firstName" />
                    </div>
                    <div class="col-span-6">
                        <TextInput v-model="request.lastName" />
                    </div>
                    <div class="col-span-12">
                        <TagInput v-model="request.skills" label="Technology Skills"
                            :allowableValues="['c#','servicestack','vue','.net','typescript']" />
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between">
            <div></div>
            <div class="flex justify-end">
                <SecondaryButton class="mr-4">Cancel</SecondaryButton>
                <PrimaryButton type="submit">Submit</PrimaryButton>
            </div>
        </div>
    </div>
</form>


<ApiReference component="TagInput">Allowable Values</ApiReference>

The list of allowable values can also be populated on C# Request DTO from a JavaScript expression:

```csharp
public class MyRequest
{
    [Input(Type = "tag", Options="{ allowableValues: ['c#','servicestack','vue'] }")]
    public List<string>? Skills { get; set; }
}
```

Or from a [#Script Expression](https://sharpscript.net) in `EvalEvalAllowableValues` where it can be populated from a static list, e.g:

```csharp
public class MyRequest
{
    [Input(Type = "tag", EvalEvalAllowableValues="['c#','servicestack','vue']")]
    public List<string>? Skills { get; set; }
}
```

Or sourced from a C# Expression, e.g:

```csharp
public class MyRequest
{
    [Input(Type = "tag", EvalEvalAllowableValues="AppData.Tags")]
    public List<string>? Skills { get; set; }
}
```

Where it can be populated from a dynamic data source like from an RDBMS populated in your AppHost on Startup, e.g:

```csharp
ScriptContext.Args[nameof(AppData)] = new AppData {
    Tags = db.Select<Tag>().Select(x => x.Name).ToList()
};
```