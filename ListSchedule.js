/// <reference path="MindFusion.Scheduling-vsdoc.js" /> 

var p = MindFusion.Scheduling;

//create a new calendar instance
calendar = new p.Calendar(document.getElementById("calendar"));

//set the view to list
calendar.currentView = p.CalendarView.List;

//customize the list appearance
calendar.listSettings.orientation = p.Orientation.Horizontal;
calendar.listSettings.numberOfCells = 4;
calendar.listSettings.titleFormat = "MMMM d";
calendar.listSettings.generalFormat = "dddd";
calendar.listSettings.firstDayOfMonthFormat = "dddd";

//customize the appearance of items
calendar.itemSettings.tooltipFormat = "%d";
calendar.itemSettings.titleFormat = "%s[HH:mm] - %e[HH:mm] %h";

//add some contacts

var resource;

resource = new p.Contact();
resource.firstName = "Prof. William";
resource.lastName = "Dyer";
calendar.schedule.contacts.add(resource);

resource = new p.Contact();
resource.firstName = "Prof. Ann";
resource.lastName = "Fletcher";
calendar.schedule.contacts.add(resource);

resource = new p.Contact();
resource.firstName = "Dr. Gregory";
resource.lastName = "Dillamond";
calendar.schedule.contacts.add(resource);

//add some locations
resource = new p.Location();
resource.name = "Room 211";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "Auditorium 1";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "Hall 3A";
calendar.schedule.locations.add(resource);

// attach handler
calendar.itemCreating.addEventListener(handleItemCreating);

function handleItemCreating(sender, args) {
    //when a new item is created we assign automatically the subject
    if (args.item.contacts.count() > 0) {
        

        //the details field is used by the tooltip
        args.item.details = args.item.contacts.items()[0].firstName + " " +
				args.item.contacts.items()[0].lastName;

        if (args.item.location != null)
            args.item.details += " - " + args.item.location.name;


        switch (args.item.contacts.items()[0].lastName) {
            case 'Dyer':
                {
                    args.item.subject = "Foundations for Higher Mathematics";
                    args.item.cssClass = "itemClass1";
                    break;
                }
            case 'Fletcher':
                {
                    args.item.subject = "Classical Mechanics";
                    args.item.cssClass = "itemClass2";
                    break;
                }
            case 'Dillamond':
                {
                    args.item.subject = "The Special Theory of Relativity";
                    args.item.cssClass = "itemClass3";
                    break;
                }
        }
    }

}

//set the theme
calendar.theme = "standard";

calendar.render();

function handleClick(cb)
{
    for(var i = 0; i < calendar.schedule.items.count(); i++)
    {
        var item = calendar.schedule.items.items()[i];

        if(item.contacts.count() > 0)
        {
            if(item.contacts.items()[0].lastName == cb.value)
                item.visible = cb.checked;
        }
    }

    this.calendar.repaint(true);
}

// create the options for the location drop-down
var option = document.createElement("option");
option.innerHTML = "All";
option.value = -1;
document.getElementById("location").appendChild(option);

//add all calendar locations to the HTML drop down list
for (var i = 0; i < calendar.schedule.locations.count() ; i++) {
    resource = calendar.schedule.locations.items()[i];
    option = document.createElement("option");
    option.innerHTML = resource.name;
    option.value = i;
    document.getElementById("location").appendChild(option);
}

//render only those items, whose location is selected
function filterLocation(list) {
    this.calendar.locations.clear();

    if (list.value == -1) {
        // clear the locations filter
        this.calendar.groupType = p.GroupType.None;
    }
    else {
        var resource = calendar.schedule.locations.items()[document.getElementById("location").value];
        // add the location by which to filter to the calendar.locations collection
        this.calendar.locations.add(resource);
        this.calendar.groupType = p.GroupType.FilterByLocations;
    }


    // repaint the calendar
    this.calendar.repaint(true);

}