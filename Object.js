class Course {
    constructor(code, name, year, credit, compulsary_elective, department_service, instructor) {
    this._code = code;
    this._name = name;
    this._year = year;
    this._credit = credit;
    this._compulsary_elective = compulsary_elective;
    this._department_service = department_service;
    this._instructor = instructor;
    this._hasRoom = false;
    }
    setRoom() {
        this._hasRoom = true;
    }
    
    setEmpty() {
        this._hasRoom = false;
    }
    
    toString() {
        return this._code;
    }
    
    }
    class Instructor {
        constructor(name) {
        this._name = name;
        this._busy_time = [];
        }
        setBusyTime(day, time) {
            this._busy_time.push(new BusyTime(day, time));
        }
        
        isBusy(day, time) {
            for (let b of this._busy_time) {
                if (b._day === day && b._time === time) {
                    return true;
                }
            }
            return false;
        }
        
        toString() {
            return this._name;
        }
    }
    class BusyTime {
        constructor(day, time) {
        this._day = day;
        this._time = time;
        }
        }
        
        class Schedule {
        constructor(bigRoom, smallRoom) {
        this.schedule_table = {
        "Monday": {"Morning": [], "Afternoon": []},
        "Tuesday": {"Morning": [], "Afternoon": []},
        "Wednesday": {"Morning": [], "Afternoon": []},
        "Thursday": {"Morning": [], "Afternoon": []},
        "Friday": {"Morning": [], "Afternoon": []}
        };
        this._bigRoom = bigRoom;
        this._smallRoom = smallRoom;
        this.used_bigRooms = {
        "Monday": {"Morning": 0, "Afternoon": 0},
        "Tuesday": {"Morning": 0, "Afternoon": 0},
        "Wednesday": {"Morning": 0, "Afternoon": 0},
        "Thursday": {"Morning": 0, "Afternoon": 0},
        "Friday": {"Morning": 0, "Afternoon": 0}
        };
        this.used_smallRooms = {
        "Monday": {"Morning": 0, "Afternoon": 0},
        "Tuesday": {"Morning": 0, "Afternoon": 0},
        "Wednesday": {"Morning": 0, "Afternoon": 0},
        "Thursday": {"Morning": 0, "Afternoon": 0},
        "Friday": {"Morning": 0, "Afternoon": 0}
        };
        }
        hasBigRoom(day, time) {
            if (this.used_bigRooms[day][time] < this._bigRoom) {
                return true;
            }
            return false;
        }
        
        hasSmallRoom(day, time) {
            if (this.used_smallRooms[day][time] < this._smallRoom) {
                return true;
            }
            return false;
        }
        
        addToSchedule(code, roomSize, day, time) {
            let room;
            if (roomSize === "bigRoom") {
                this.used_bigRooms[day][time] += 1;
                room = (roomSize + this.used_bigRooms[day][time]);
            } else {
                this.used_smallRooms[day][time] += 1;
                room = (roomSize + this.used_smallRooms[day][time])
                this.schedule_table[day][time].append(ScheduleFormat(code, room, day, time))
            }
        }
        display() {
            const days = ["Monday","Tuesday", "Wednesday", "Thursday", "Friday"];
          
            for (let day of days) {
              for (let s of this.schedule_table[day]["Morning"]) {
                s.display();
              }
              for (let s of this.schedule_table[day]["Afternoon"]) {
                s.display();
              }
              console.log("****************************************");
            }
          }
        }

        class ScheduleFormat {
            constructor(code, room, day, time) {
                this._day = day; // day and time
                this._time = time;
                this._code = code; // course code
                this._room = room; // big or small with index 
            }
        
            display() {
                console.log(this._day + " " + this._time + " " + this._room + " " + this._code);
            }
        
            replace(code) {
                this._code = code;
            }
        }

