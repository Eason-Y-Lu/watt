# WATT API Docs
Welcome to WATT's API documentation! Information about the endpoints exposed by the API can be found here.
The base URL for WATT's REST API is `gunnwatt.web.app/api`.

### GET /alternates
Returns an [`Alternates`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#alternates) object corresponding
to WATT's current generated alternate schedules.

##### Example successful response:
```json
{"alternates": {}, "timestamp": "2022-04-30T19:15:30.052Z"}
```

### GET /schedule
Returns a [`Schedule`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#schedule) object corresponding to the 
requested day's schedule, and a boolean indicating whether that schedule is an alternate.

##### Response schema
```ts
{periods: Schedule, alternate: boolean}
```
- `periods`: The day's [`Schedule`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#schedule).
- `alternate`: Whether that schedule is an alternate.

##### Request parameters

| Parameter           | Type     | Description                                                                                                             |
|---------------------|----------|-------------------------------------------------------------------------------------------------------------------------|
| `date` *(optional)* | `string` | An ISO timestamp representing the day to return the schedule for. If no date is provided, the current day will be used. |

##### HTTP status codes

| Status code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| 200         | OK                                                                          |
| 400         | `query.date` was provided but not a string, or invalid as an ISO timestamp. |

##### Example successful response:
```json
{"periods": null, "alternate": false}
```

##### Example error response:
```json
{"error": "Error parsing date string: the input \"aaa\" can't be parsed as ISO 8601."}
```

### GET /menu
Returns an object of [`Entries`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#entry) corresponding to the 
requested day's brunch and lunch menu.

##### Response schema
```ts
{brunch: {[item: string]: Entry}, lunch: {[item: string]: Entry}}
```
- `brunch` + `lunch`: The day's menu items as [`Entries`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#entry).

##### Request parameters

| Parameter           | Type     | Description                                                                                                             |
|---------------------|----------|-------------------------------------------------------------------------------------------------------------------------|
| `date` *(optional)* | `string` | An ISO timestamp representing the day to return the schedule for. If no date is provided, the current day will be used. |

##### HTTP status codes

| Status code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| 200         | OK                                                                          |
| 400         | `query.date` was provided but not a string, or invalid as an ISO timestamp. |

##### Example successful response:
```json
{"brunch": {}, "lunch": {}}
```

##### Example error response:
```json
{"error": "Error parsing date string: the input \"aaa\" can't be parsed as ISO 8601."}
```

### GET /next-period
Returns a [`PeriodObj`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#periodobj) corresponding to the next or 
current period, the period immediately before it, and additional information for displaying those periods.

##### Response schema
```ts
{
    prev: PeriodObj | null, next: PeriodObj | null, startingIn: number, endingIn: number, 
    nextSeconds: number, minutes: number, seconds: number
}
```
- `prev`: A [`PeriodObj`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#periodobj) corresponding to the previous
  period, or `null` if there is none.
- `next`: A [`PeriodObj`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#periodobj) corresponding to the next or
  current period, or `null` is there is none.
- `startingIn`: The minutes until the `next` period starts, rounded down (if there is less than a minute left, this is `0`). 
  If the period has already started, this is negative. If there is no next period, this is `0`.
- `endingIn`: The minutes until the `next` period ends, rounded down. If there is no next period, this is `0`.
- `nextSeconds`: The seconds left in the current minute of the provided timestamp. When `startingIn` or `endingIn` are `0`
  and `next` is not null, you can use this to display `"ending in {...} seconds"` instead of `"ending in 0 minutes"`.
- `minutes`: The minutes elapsed since 12:00 AM in the timezone `America/Los_Angeles`, for progress bars.
- `seconds`: The seconds elapsed since 12:00 AM in the timezone `America/Los_Angeles`, for progress bars.

##### Request parameters

| Parameter               | Type      | Description                                                                                                                                 |
|-------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `date` *(optional)*     | `string`  | An ISO timestamp representing the date and time to get the next period for. If no date is provided, the current date and time will be used. |
| `period0` *(optional)*  | `boolean` | Whether to include Period 0 when parsing the next period. Defaults to `false`.                                                              |
| `period8` *(optional)*  | `boolean` | Whether to include Period 8 when parsing the next period. Defaults to `false`.                                                              |
| `gradYear` *(optional)* | `number`  | The graduation year to filter year-specific periods for. If not provided, all periods are included.                                         |

##### HTTP status codes

| Status code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| 200         | OK                                                                          |
| 400         | `query.date` was provided but not a string, or invalid as an ISO timestamp. |
| 400         | `query.gradYear` was provided but not a number.                             |

##### Example successful response:
```json
{
  "prev": {"n": "7", "s": 905, "e": 950},
  "next": {"n": "8", "s": 960, "e": 1005},
  "startingIn": 3,
  "endingIn": 48,
  "nextSeconds": 23,
  "minutes": 956.6166666666667,
  "seconds": 57397
}
```

##### Example error response:
```json
{"error": "Error parsing date string: the input \"aaa\" can't be parsed as ISO 8601."}
```

### GET /next-period-message
Returns a string containing information about the next period. Equivalent to fetching `/next-period` and returning
```ts
"{period} is ending in {...} {minutes | seconds}, started {...} {minutes | seconds} ago."
```
if `next` has started and
```ts
"{period} is starting in {...} {minutes | seconds}."
```
if it has not.

##### Response schema
```ts
{message: string | null}
```
- `message`: The message, or `null` if there is no next period.

##### Request parameters

| Parameter               | Type       | Description                                                                                                                                 |
|-------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `date` *(optional)*     | `string`   | An ISO timestamp representing the date and time to get the next period for. If no date is provided, the current date and time will be used. |
| `period0` *(optional)*  | `boolean`  | Whether to include Period 0 when parsing the next period. Defaults to `false`.                                                              |
| `period8` *(optional)*  | `boolean`  | Whether to include Period 8 when parsing the next period. Defaults to `false`.                                                              |
| `gradYear` *(optional)* | `number`   | The graduation year to filter year-specific periods for. If not provided, all periods are included.                                         |

##### HTTP status codes

| Status code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| 200         | OK                                                                          |
| 400         | `query.date` was provided but not a string, or invalid as an ISO timestamp. |
| 400         | `query.gradYear` was provided but not a number.                             |

##### Example successful response:
```json
{"message": "Period 6 ending in 87 minutes, started 3 minutes ago."}
```

##### Example error response:
```json
{"error": "Error parsing date string: the input \"aaa\" can't be parsed as ISO 8601."}
```

### GET /clubs
Returns WATT's generated clubs list.

##### Response schema:
```ts
{timestamp: string, data: {[key: string]: Club}}
```
- `timestamp`: The ISO timestamp of the last run of [`/scripts/clubs`](https://github.com/GunnWATT/watt/tree/main/scripts#clubs).
- `data`: An object with unique club ID keys corresponding to their [`Club`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#club)
  object. Club IDs are randomly generated 5-digit integers and persist between regens (the same ID will map to the same
  club, if it exists, after regenerating clubs).

##### Example successful response:
```json
{
  "data": {
    "55585": {
      "new": false,
      "name": "United Computations",
      "tier": 2,
      "desc": "United Computations brings together a community of people interested in CS. During our weekly lunch meetings, we explore the various fields of CS through hands-on activities, guest speakers, lectures, and more. We also plan and run Gunn’s annual hackathon (GunnHacks 8.0) -- and any club member can apply to help out with publicity, website, events planning, and sponsorships! We’re one of the longest-running AND largest CS clubs at Gunn. Anyone is welcome to join!",
      "day": "Wednesday",
      "time": "Lunch",
      "room": "N-215",
      "prez": "Alina Li",
      "advisor": "Josh Paley",
      "email": "jpaley@pausd.org"
    }
  }, 
  "timestamp": "2022-04-30T18:09:09.395Z"
}
```

### GET /staff
Returns WATT's generated staff list.

##### Response schema:
```ts
{timestamp: string, data: {[key: string]: StaffObj}}
```
- `timestamp`: The ISO timestamp of the last run of `/scripts/staff`.
- `data`: An object with unique staff ID keys corresponding to their [`Staff`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#staff)
  object. Staff IDs are randomly generated 5-digit integers and persist between regens (the same ID will map to the same
  staff member, if they exist, after regenerating clubs).

##### Example successful response:
```json
{
  "data": {
    "47914": {
      "email": "hnewland@pausd.org",
      "name": "Harvey Newland",
      "dept": "Asst. Principal",
      "phone": "354-8260",
      "room": "E building",
      "ext": "6885"
    }
  }, 
  "timestamp": "2022-09-10T19:28:14.602Z"
}
```

### GET /courses
Returns WATT's generated course catalog.

##### Response schema:
```ts
{timestamp: string, data: Course[]}
```
- `timestamp`: The ISO timestamp of the last run of `/scripts/catalog:generate`.
- `data`: An array of [`Course`](https://github.com/GunnWATT/watt/blob/main/docs/types.md#course)s offered at Gunn.

##### Example successful response:
```json
{
  "data": [
    {
      "names": [
        {"title": "ENGINEERING TECHNOLOGY", "cid": "8574"}
      ],
      "grades": [10, 11, 12],
      "length": "Year",
      "credit": "UC Approved “g”",
      "section": "CAREER TECHNICAL EDUCATION (CTE)",
      "description": "This is a hands-on course that will provide students real-life experience in mechanical design, machine shop skills, \nengineering project work and leadership. The curriculum is designed to fit the needs of both four-year-college-bound \nstudents and those interested in a two-year career tech education. Conceptual instruction begins with the design cycle, \nwhich students experience in all stages, including hands-on skill development from brainstorming to prototyping to \nmanufacturing and testing. Mechanism design and prototyping, programming, electronics, pneumatics, machining \nand welding, and CAD (computer-aided design) technologies are introduced to all students using industry-standard \nequipment. Applications of scientific and engineering principles, group dynamics, leadership and communication \nskills are developed in an activity-oriented approach including informal classroom challenges and two or more FIRST \nRobotics competitions each year. \nStudents who wish to enroll in Engineering Technology must select this course as an Alternate since members will be \nselected as members of the Gunn Robotics Team (GRT). Team members will be selected based on team needs of skills. \nAn application process will be used to award spaces within GRT, and detailed information regarding this process will \nbe published in January. Students who have completed Introduction to Engineering Design, Principles of Engineering \nand Robotics, an Automotive Technology course, or a Stage Technology course will be given special consideration \nduring the selection process.",
      "hw": "Yearlong participation in after-school and weekend activities is required. First semester 4 hours per week average, second semester (January through April) 12 hours per week minimum.",
      "slos": ["1", "2", "3", "4", "5", "6", "7"]
    }
  ], 
  "timestamp": "2022-09-10T19:28:14.602Z"
}
```
