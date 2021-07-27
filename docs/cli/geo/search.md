---
title: Search
description: Use Amplify CLI to create and manage location search indices(or place indices) that are used to search for places in your application.
---

Amplify CLI's `geo` category enables you to create and manage place index resources used to search by places, addresses and coordinates in your application.

## Setup a new Search Index

You can setup a new location search index by running the following command:

```bash
amplify add geo
```
```console
? Select which capability you want to add:
  Map (visualize the GeoSpatial data)
> Location search (search by places, addresses, coordinates)
```
If you haven't set up the `auth` category already, the Amplify CLI will guide you through a workflow to enable the auth category.

```console
? You need to add auth (Amazon Cognito) to your project in order to add geo resources. Do you want to add auth now?
> Yes

Using service: Cognito, provided by: awscloudformation
```

Next, you can set a friendly name for the location search index:

```console
? Provide a name for the location search index (place index):
> MyPlaceIndex
```

### Search Access permissions

Next, configure the access permissions for your location search index. You can scope permissions based on an individual user's authentication status.

```console
? Who can access this Search Index?
❯ Authorized users only
  Authorized and Guest users
```

Select `Authorized users only` if only authenticated users can have read-only permissions for the location search index.

Select `Authorized and Guest users` if both authenticated and un-authenticated users can have read-only permissions for the location search index.

These read-only permissions include:
```
geo:SearchPlaceIndexForPosition,
geo:SearchPlaceIndexForText
```
For more information, refer [link to location service page](https://docs.aws.amazon.com/location/latest/developerguide/security_iam_id-based-policy-examples.html#security_iam_id-based-policy-examples-search-for-place).

### Search Pricing Plan
Amplify provides a set of questions to help you decide the pricing plan relevant to your application's use-case. 
These pricing plan related set of questions are presented to you when you add the first Geo resource to your application. 
Once you chose the pricing plan, it will be automatically used for the subsequent Geo resources added to your application.

```console
The following choices determine the pricing plan for Geo resources.

? Are you tracking commercial assets for your business in your app?
❯ No, I only need to track consumers personal mobile devices 
  Yes, I track commercial assets (For example, any mobile object that is tracked by a company in support of its business)

Successfully set RequestBasedUsage pricing plan for your Geo resources.
```

```console
? Are you tracking commercial assets for your business in your app?
  No, I only need to track consumers personal mobile devices 
❯ Yes, I track commercial assets (For example, any mobile object that is tracked by a company in support 
  of its business)

? Does your app provide routing or route optimization for commercial assets? (y/N) no

Successfully set MobileAssetTracking pricing plan for your Geo resources.
```

```console
? Are you tracking commercial assets for your business in your app?
  No, I only need to track consumers personal mobile devices 
❯ Yes, I track commercial assets (For example, any mobile object that is tracked by a company in support 
  of its business)

? Does your app provide routing or route optimization for commercial assets? (y/N) yes

Successfully set MobileAssetManagement pricing plan for your Geo resources.
```

We advice you to go through the [location service pricing](https://aws.amazon.com/location/pricing/) along with the [location service terms](https://aws.amazon.com/service-terms/) (_82.5 section_) to learn more about the pricing plan.

### Advanced Settings
You can optionally set additional properties of the location search index. If you choose to skip, defaults will be set for these properties. 

```console
Available advanced settings:
- Search data provider (default: Esri)
- Search result storage location (default: no result storage)

? Do you want to configure advanced settings? 
> Yes
```

#### Search data provider
You can select a data provider as the source for geocoding, reverse geocoding and searches.
Each provider gathers and curates their data using different means. They may also have varying expertise in different regions of the world.
The available data providers of GeoSpatial data are shown. To learn more about data providers, please refer this [location service doc](https://docs.aws.amazon.com/location/latest/developerguide/what-is-data-provider.html).

```console
? Specify the data provider of GeoSpatial data for this Search Index:
❯ Esri
  Here
```

`Esri` will be set as default data provider for the location search index, if you do not want to explicitly set this property.

#### Search result storage location
You can specify how the results of a search operation will be stored by the caller.
```console
? Specify the data storage option for requesting Places:
> SingleUse
  Storage
```
`SingleUse` specifies that the results won't be stored. This will be chosen as default if the developer does not want to explicitly set this property. 
`Storage` specifies that the result can be cached or stored in a database.
Refer [this location service doc](https://docs.aws.amazon.com/location-places/latest/APIReference/API_DataSourceConfiguration.html#locationplaces-Type-DataSourceConfiguration-IntendedUse) for more information. 

### Set a default search index
If your application uses more than one location search index added using `amplify add geo`, the index that was added the latest will be the default. 
However, you can choose if the current search index should be the default one used in your application:

```console
? Do you want to set this search index as default?
> No
```
Answering `No` will retain the previously set default.

That's it! You can now search for places in your application. Follow the steps as listed [here]() for Javascript applications.