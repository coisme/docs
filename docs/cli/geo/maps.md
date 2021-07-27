---
title: Maps
description: Use Amplify CLI to create and manage maps to visualize GeoSpatial data in your app.
---

Amplify CLI's `geo` category enables you to create and manage map resources used to visualize GeoSpatial data in your application. 

## Setup a new Map

You can setup a new map by running the following command:

```bash
amplify add geo
```
```console
? Select which capability you want to add:
> Map (visualize the GeoSpatial data)
  Location search (search by places, addresses, coordinates)
```
If you haven't set up the `auth` category already, the Amplify CLI will guide you through a workflow to enable the auth category.

```console
? You need to add auth (Amazon Cognito) to your project in order to add geo resources. Do you want to add auth now?
> Yes

Using service: Cognito, provided by: awscloudformation
```

Next, you can set a friendly name for the Map being provisioned. 
```console
? Provide a name for the Map:
> StreetsMap
```

### Map Access permissions

Next, configure the access permissions for your Map resource. You can scope permissions based on an individual user's authentication status.

```console
? Who can access this Map?
❯ Authorized users only
  Authorized and Guest users
```

Select `Authorized users only` if only authenticated users can have read-only permissions for the map.

Select `Authorized and Guest users` if both authenticated and un-authenticated users can have read-only permissions for the map.

These read-only permissions allow rendering of the Map in user's application:
```
geo:GetMapStyleDescriptor,
geo:GetMapGlyphs,
geo:GetMapSprites,
geo:GetMapTile
```
For more information, refer [link to location service page](https://docs.aws.amazon.com/location/latest/developerguide/security_iam_id-based-policy-examples.html#security_iam_id-based-policy-examples-get-map-tiles).

### Map Pricing Plan
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
You can optionally set additional properties of the Map. If you choose to skip, defaults will be set for these properties. 

```console
Available advanced settings:
- Map style & Map data provider (default: Streets provided by Esri)

? Do you want to configure advanced settings? 
> Yes
```

#### Map style & Map data provider
You can pick a style for the map resource. The available map styles along with the data provider of GeoSpatial data are shown. To learn more about each of these map styles, please refer this [location service doc](https://docs.aws.amazon.com/location-maps/latest/APIReference/API_MapConfiguration.html).

```console
? Specify the map style:
❯ Streets (data provided by Esri) 
  Berlin (data provided by Here) 
  Topographic (data provided by Esri) 
  Navigation (data provided by Esri) 
  LightGrayCanvas (data provided by Esri) 
  DarkGrayCanvas (data provided by Esri)
```

`Streets (data provided by Esri) ` will be the default option that will be used to set Map style, if you do not want to explicitly set this property. 

#### Set a default Map
If your application uses more than one Map added using `amplify add geo`, the map that was added the latest will be the default. 
However, you can choose if the current Map should be the default for your application:

```console
? Do you want to set this map as default?
> No
```
Answering `No` will retain the previously set default.

That's it! You can now render maps in your application. Follow the steps as listed [here]() for Javascript applications.