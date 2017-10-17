import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode, ConfirmationService, Message } from 'primeng/primeng';
import { SampleProjectsData } from 'app/timesheet/sample.projects.data';
import { SamplePeopleData } from 'app/timesheet/sample.people.data';

declare var moment: any;
export enum PageNames {
  TimePage,
  ProjectPage,
  PlacePage,
  PeoplePage
}
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers: [ConfirmationService]
})
export class TimesheetComponent implements OnInit {
  private userTimeData = [
    { day: 'Monday', startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: 'Frontend' },
    { day: 'Tuesday', startTime: '9:00', endTime: '17:00', project: 'Payroll App', category: 'Backend' },
    { day: 'Wednesday', startTime: '9:00', endTime: '17:00', project: 'Point of Sale App', category: 'Operations' },
    { day: 'Thursday', startTime: '9:00', endTime: '17:00', project: 'Mobile App', category: 'Planning' },
    { day: 'Friday', startTime: '9:00', endTime: '17:00', project: 'Agile Times', category: 'Requirements' },
  ];

  daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  day = 'Monday';
  dateAndMonth = moment().day(this.day).format('MMMM Do, YYYY');

  displayEditDialog = false;

  dialogPageIndex = PageNames.TimePage;
  dialogPages: MenuItem[] = [
    { label: 'Time' },
    { label: 'Project' },
    { label: 'Place' },
    { label: 'People' }
  ];

  PageNames = PageNames;
  private headerConfig = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };

  private events = [
    {
      title: 'Recent Work',
      start: moment().format(),
      end: moment().add(1, 'hour').format()
    }
  ];

  projectsTree: TreeNode[] = SampleProjectsData.projects;
  selectedProject: TreeNode;

  people = SamplePeopleData.people;

  messages: Message[] = [];
  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }
  getTimesForDay(day) {
    return this.userTimeData.filter(row => {
      return row.day === day;
    });
  }
  onChangeTabs(event) {
    const index = event.index;
    this.day = this.daysOfWeek[index];
    this.dateAndMonth = moment().day(this.day).format('MMMM Do, YYYY');
  }
  cancelDialog() {
    this.confirmationService.confirm({
      header: 'Cancel Time Creation',
      message: 'Cancel all changes. Are you sure?',
      accept: () => {
        this.displayEditDialog = false;
        this.messages.push({
          severity: 'info',
          summary: 'Edit Canceled',
          detail: 'No changes were saved'
        })
      },
      reject: () => console.log('False cancel. Just keep editing.')
    });
  }
  saveNewEntry() {
    this.displayEditDialog = false;
    this.messages.push({
      severity: 'success',
      summary: 'Entry Created',
      detail: 'Your entry has been created'
    });
  }
}
