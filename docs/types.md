# API Types
The full reference for all types referenced in WATT's API can be found below:

### PeriodObj
An object representing a class period.
```ts
type PeriodObj = {n: string, s: number, e: number, note?: string, grades?: number[]};
```
#### Reference: 
[`/shared/data/schedule.ts`](https://github.com/GunnWATT/watt/blob/main/shared/data/schedule.ts#L8)

#### Specifications:
- `n`: The name of the period. This will be a string corresponding to one of the following:

| Name                           | Description                                                                                                                                   |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `'0'`, `'1'`, `'2'`, ... `'8'` | The period corresponding to the given number. `'1'` is 1st period, `'2'` is 2nd, etc.                                                         |
| `'B'`                          | Brunch.                                                                                                                                       |
| `'L'`                          | Lunch.                                                                                                                                        |
| `'S'`                          | SELF.                                                                                                                                         |
| `'P'`                          | PRIME.                                                                                                                                        |
| `'H'`                          | Study hall.                                                                                                                                   |
| `'G'`                          | Gunn Together. *(deprecated)*                                                                                                                 |
| `'O'`                          | Office hours. *(deprecated)*                                                                                                                  |
| Any other string               | An unrecognized period. This can be a one-off period such as `'Title IX Lesson'`, or a recurring but unsupported period such as `'Math CAT'`. |

- `s`: The start time of the period, in minutes after `12:00 AM` in the timezone `America/Los_Angeles`.
- `e`: The end time of the period, in minutes after `12:00 AM` in the timezone `America/Los_Angeles`.
- `note`?: An optional note with more details about the period.
- `grades`?: The subset of grades this period applies to. If not provided, the period applies for all grades.

#### Example:
```json
{"n": "1", "s": 540, "e": 585}
```

### Schedule
An object representing a day's schedule. The `Schedule` comprises an array of `PeriodObj`s representing the day's periods, 
or `null` if there is no school on that day.
```ts
type Schedule = PeriodObj[] | null;
```

#### Example:
```json
[
  {"n": "0", "s": 475, "e": 530},
  {"n": "5", "s": 540, "e": 635},
  {"n": "B", "s": 635, "e": 640},
  {"n": "6", "s": 650, "e": 740},
  {"n": "L", "s": 740, "e": 770},
  {"n": "7", "s": 780, "e": 870},
  {"n": "P", "s": 880, "e": 930}
]
```

### Alternates
An alternates object, containing a `timestamp` of the last time alternates were generated from the iCal and an object with 
date-string keys corresponding to the alternate `Schedule` on that day.
```ts
type Alternates = {
    timestamp: string,
    alternates: {[key: string]: Schedule}
}
```
#### Reference: 
[`/client/src/contexts/AlternatesContext.ts`](https://github.com/GunnWATT/watt/blob/main/client/src/contexts/AlternatesContext.ts#L5-L8)

#### Specifications:
- `timestamp`: The ISO timestamp of the last run of [`/scripts/alternates:deploy`](https://github.com/GunnWATT/watt/tree/main/scripts#deploy-alternates).
- `alternates`: An object with date keys corresponding to the alternate schedule on that day, if any exist. Keys of this 
  object are specified in the format `MM-DD` (ex. `January 15` would be `01-15`).

#### Example:
*[See example API response for `/api/alternates`.](https://github.com/GunnWATT/watt/blob/main/docs/index.md#get-alternates)*

### Club
An object representing a club at Gunn.
```ts
type Club = {
    new: boolean, name: string, tier: 1 | 2 | 3, desc: string, 
    day: string, time: "Lunch" | "After School", room: string,
    zoom?: string, video?: string, signup?: string, 
    prez: string, advisor: string, email: string, coadvisor?: string, coemail?: string;
}
```
#### Reference:
[`/shared/data/clubs.ts`](https://github.com/GunnWATT/watt/blob/main/shared/data/clubs.ts#L1-L6)

#### Specifications:
- `new`: Whether this club is new.
- `name`: The name of the club.
- `tier`: The club's tier. See the [SEC website](https://www.gunnsec.org/clubs-info-and-forms.html) for what different
  club tiers mean.
- `desc`: The description of this club.
- `day`: The day of the week this club takes place.
- `time`: The time of the day this club takes place. Either `"Lunch"` or `"After School"`.
- `room`: The location of this club.
- `zoom`?: *(deprecated)* The club's zoom link, if it exists. This was used during quarantine and this property no longer 
  exists on new clubs.
- `video`?: *(deprecated)* The club's club fair video link, if it exists. This was used during the virtual club fair 
  held over quarantine and no longer exists on new clubs.
- `signup`?: *(deprecated)* The club's signup form, if it exists. This was used during the virtual club fair
  held over quarantine and no longer exists on new clubs.
- `prez`: The name of the club president.
- `advisor`: The name of the club advisor.
- `email`: The PAUSD email of the club advisor.
- `coadvisor`?: The name of the club coadvisor, if they exist.
- `coemail`?: The PAUSD email of the club coadvisor, if they exist.

#### Example:
```json
{
  "new": false,
  "name": "Youth Community Service - Interact (YCS-I)",
  "tier": 3,
  "desc": "Youth Community Service - Interact (YCS-I) is a community service club that works with the community organization, YCS, and the international program, Interact, to try and improve our community. Some of the events we put on are Service Day, Service Fair, Service Trip, and an Open Mic. We also regularly update club members on different community service opportunities as we are notified about them.",
  "day": "Monday",
  "time": "Lunch",
  "room": "N115",
  "prez": "Micaela Leong",
  "advisor": "Diane Ichikawa",
  "email": "dichikawa@pausd.org",
  "coadvisor": "David Deggeller",
  "coemail": "ddeggeller@pausd.org"
}
```

### Entry
An object representing a brunch or lunch menu item.

```ts
type Entry = {
    serving?: {
        serving_size_amount: string,
        serving_size_unit: string
    },
    nutrition?: {
        calories?: number,
        g_fat?: number,
        g_saturated_fat?: number,
        g_trans_fat?: number,
        mg_cholesterol?: number,
        g_carbs?: number,
        g_added_sugar?: number,
        g_sugar?: number,
        mg_potassium?: number,
        mg_sodium?: number,
        g_fiber?: number,
        g_protein?: number,
        mg_iron?: number,
        mg_calcium?: number,
        mg_vitamin_c?: number,
        iu_vitamin_a?: number,
        re_vitamin_a?: number,
        mcg_vitamin_a?: number,
        mg_vitamin_d?: number,
        mcg_vitamin_d?: number,
    },
    ingredients?: string
}
```
#### Reference:
[`/client/src/contexts/MenuContext.ts`](https://github.com/GunnWATT/watt/blob/main/client/src/contexts/MenuContext.ts#L4-L32)

#### Specifications:
- `serving`?: An object containing the serving size and unit of the described item.
- `nutrition`?: An object containing general nutrition information about the described item.
- `ingredients`?: A string containing the ingredients of the described item.

#### Example:
```json
{
  "serving": {
    "serving_size_amount": "1",
    "serving_size_unit": "package"
  },
  "nutrition": {
    "calories": 90,
    "g_fat": 2.5,
    "g_saturated_fat": 0,
    "g_trans_fat": 0,
    "mg_cholesterol": 0,
    "g_carbs": 17,
    "g_added_sugar": 5,
    "g_sugar": 5,
    "mg_potassium": 40,
    "mg_sodium": 90,
    "g_fiber": 1,
    "g_protein": 1,
    "mg_iron": 0.7,
    "mg_calcium": 10,
    "mg_vitamin_c": 0,
    "iu_vitamin_a": 0,
    "re_vitamin_a": null,
    "mcg_vitamin_a": null,
    "mg_vitamin_d": null,
    "mcg_vitamin_d": 0
  },
  "ingredients": "Honey Graham Crackers (WHOLE WHEAT FLOUR, ENRICHED FLOUR (WHEAT FLOUR, NIACIN, REDUCED IRON, VITAMIN B1 (THIAMIN MONONITRATE), VITAMIN B2 (RIBOFLAVIN), FOLIC ACID), SUGAR,   VEGETABLE OIL (SOYBEAN AND/OR CANOLA), MOLASSES, HONEY, CORN SYRUP, CONTAINS 2% OR LESS OF LEAVENING (BAKING SODA, SODIUM ACID PYROPHOSPHATE, MONOCALCIUM PHOSPHATE), SALT, SOY LECITHIN.)"
},
```

### Staff
An object representing a staff member at Gunn.

```ts
type Staff = {
    name: string, title?: string, email?: string, room?: string,
    dept: string, phone?: string, ext?: string
};
```
#### Reference:
[`/shared/data/staff.ts`](https://github.com/GunnWATT/watt/blob/main/shared/data/staff.ts#L1-L4)

#### Specifications:
- `name`: The name of the staff member.
- `title`?: *(deprecated)* The title of the staff member, if they have one. This is usually `"Teacher"`, but can be `"Athletic Trainer"`, 
  `"Contractor"`, `"Mental Health Therapist Contractor"`, etc.
- `email`?: The PAUSD email of the staff member, if they have one.
- `room`?: The room the staff member teaches in, if they have one.
- `dept`: The staff member's department, if they have one. This can be a teaching department like `"VPA"` or another
  department like `"Trainer"`, `"SpEd aide"`, or `"Asst. Principal"`.
- `phone`?: The staff member's unprefixed, internal phone number, if they have one.
- `ext`?: The staff member's extension, if they have one.

#### Example:
```json
{
  "email": "dgill@pausd.org",
  "name": "Daljeet Gill",
  "dept": "Librarian",
  "phone": "354-8252",
  "room": "Library",
  "ext": "6802"
}
```

### Course
An object representing a course offered at Gunn.

```ts
type Course = {
    names: { title: string, cid: string }[],
    grades: number[],
    length?: "Year" | "Semester" | "Semester/Year",
    credit: string, section: string,
    description: string, hw?: string,
    prereqs?: string, recCourses?: string,
    slos?: string[], notes?: string[]
}
```
#### Reference:
[`/shared/data/courses.ts`](https://github.com/GunnWATT/watt/blob/main/shared/data/courses.ts#L1-L9)

#### Specifications:
- `names`: An array containing the names of the course. Each name has a title and CID (ex. `ADVANCED STAGE TECHNOLOGY & 
  DESIGN` has CID `4915`). Courses with different CIDs per semester or that are combined in the course catalog (all
  same level language classes, dual enrollment options, SLC and social justice pathway options) will have multiple names
  and CIDs corresponding to each variant offered.
- `grades`: The grades that are able to take this course (eg. `[10, 11, 12]`).
- `length`?: The length of the course. This can either be yearlong, semester, or in rare circumstances both. Some special
  courses like `Teaching Assistant` can have no length specified.
- `credit`: The UC or CSU credit the course is applicable for (eg. `"UC Approved “f”"`, `"UC Approval Pending"`, or 
  `"NOT UC Approved"`).
- `section`: The course catalog section the course belongs to.
- `description`: The description of the course.
- `hw`?: Info about the homework expectations of the course, if any.
- `prereqs`?: Info about prerequisite courses, if any.
- `recCourses`?: Info about recommended previous courses, if any.
- `slos`?: The district SLOs this course addresses, if any.
- `notes`?: Additional notes about the course, if any.

#### Example:
```json
{
  "names": [
    {"title": "STAGE TECHNOLOGY", "cid": "1087 Semester 1"},
    {"title": "STAGE TECHNOLOGY", "cid": "1088 Semester 2"}
  ],
  "grades": [9, 10, 11, 12],
  "length": "Semester",
  "credit": "NOT UC Approved",
  "section": "CAREER TECHNICAL EDUCATION (CTE)",
  "description": "Stage Technology and Design is designed to integrate theoretical and practical knowledge of stage technology and \ndesign. Students will study the design and construction of sets, lighting, sound, and costumes, and apply their skills by \ndeveloping design concepts and mounting productions from a variety of theatrical genres. By assuming vital roles in \nplay productions, students will work effectively in leadership and ensemble situations, and experience the relationship \nof technical theatre to the theatrical event as a whole. Students will learn to operate theatrical equipment and tools \nsafely, and use these skills to provide technical services for many school stage activities. This course satisfies the Career \nTechnical Education Program requirement and Visual and Performing Arts requirement, and may be repeated for \nfour years. Students who enroll in and complete Stage Technology will be given special consideration during the \nselection process for the Gunn Robotics Team (GRT).",
  "hw": "None",
  "slos": ["4", "6", "7"],
  "notes": [
    "This class meets during 8th period"
  ]
}
```
