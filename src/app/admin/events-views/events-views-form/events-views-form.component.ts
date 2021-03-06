import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DbEventTypeList, DbEventsviewGet } from '../../../services/backend/db-models/events';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { EventsService } from '../../../services/backend/events.service';
import { EventsViewsService } from '../events-views.service';
import { Observable } from 'rxjs/Observable';
import { TopicService } from '../../../services/backend/topic.service';

@Component({
  selector: 'app-events-views-form',
  templateUrl: './events-views-form.component.html',
  styleUrls: ['./events-views-form.component.css']
})
export class EventsViewsFormComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;
  topicsCtrl: FormControl;
  categoriesCtrl: FormControl;
  etyCtrl: FormControl;

  topicsList: any[] = [];
  eventsTypesList: Observable<DbEventTypeList[]>;

  originalData: any = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: EventsViewsService,
    private topicService: TopicService, private eventsService: EventsService) { }

  ngOnInit() {

    this.topicService.loadTopics().subscribe(topics => {
      this.topicsList = topics.map(t => ({ id: t.top_id, name: t.top_name }));
    });

    this.route.data.pluck('eventsViews')
      .subscribe((element: DbEventsviewGet) => {
        this.originalData = element;
        this.id = element ? element.evv_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(element);
        } else {
          this.createForm(element);
        }
      });
  }
  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: DbEventsviewGet) {
    this.nameCtrl = new FormControl(data ? data.evv_name : '', Validators.required);
    this.topicsCtrl = new FormControl(data ? data.top_ids : []);
    this.categoriesCtrl = new FormControl(data ? data.evv_categories : []);
    this.etyCtrl = new FormControl(data ? data.ety_id : '');
    this.form = this.fb.group({
      name: this.nameCtrl,
      topics: this.topicsCtrl,
      categories: this.categoriesCtrl,
      ety: this.etyCtrl
    });
    if (data) {
      this.eventsTypesList = this.eventsService.filterEventsTypes(data.evv_categories, data.top_ids);
    }
    this.form.valueChanges.subscribe(v => {
      this.eventsTypesList = this.eventsService.filterEventsTypes(v.categories, v.topics);
    });
  }

  private updateForm(data: DbEventsviewGet) {
    this.nameCtrl.setValue(data ? data.evv_name : '');
    this.topicsCtrl.setValue(data ? data.top_ids : []);
    this.categoriesCtrl.setValue(data ? data.evv_categories : []);
    this.etyCtrl.setValue(data ? data.ety_id : '');
  }

  onSubmit() {
    if (!this.id) {
      this.service.addEventsViews(
        this.nameCtrl.value,
        this.categoriesCtrl.value,
        this.etyCtrl.value > 0 ? this.etyCtrl.value : null,
        this.topicsCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding events-views';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateEventsViews(
        this.id,
        this.nameCtrl.value,
        this.categoriesCtrl.value,
        this.etyCtrl.value > 0 ? this.etyCtrl.value : null,
        this.topicsCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating events-views';
          this.errorDetails = err.text();
        });
    }
  }

  doCancel() {
    this.goBackToList();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.service.deleteEventsViews(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting events-views';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/events-views', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/events-views']);
    }
  }

  canDeactivate() {
    const ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
