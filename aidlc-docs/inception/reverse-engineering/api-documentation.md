# API Documentation

## Internal APIs
### SagaEventSpaceApiClient
- **Methods**: `searchPlaces`, `getPlace`, `createPlace`, `updatePlace`, `deletePlace`, `listAnnouncements`, etc.
- **Parameters**: SearchParams, Data payloads matching types.ts
- **Return Types**: Promise of Response matching types.ts

## Data Models
### Place
- **Fields**: id, name_ja, category, status, etc.
### Announcement
- **Fields**: id, title, message_ja, level, etc.
### ReleaseNote
- **Fields**: id, version, title, body_md, status, etc.
