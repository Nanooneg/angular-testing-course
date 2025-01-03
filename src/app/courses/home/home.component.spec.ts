import {ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync} from '@angular/core/testing';
import '@types/jasmine';
import {CoursesModule}                                                   from '../courses.module';
import {DebugElement} from '@angular/core';
import {HomeComponent} from './home.component';
import {CoursesService} from '../services/courses.service';
import {setupCourses} from '../common/setup-test-data';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let courseService: any;

  const allCourses = setupCourses();
  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');

  beforeEach(
    waitForAsync(() => {

      const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

      TestBed.configureTestingModule({
        imports: [
          CoursesModule,
          NoopAnimationsModule
        ],
        providers: [
          {provide: CoursesService, useValue: coursesServiceSpy}
        ],
      })
             .compileComponents()
             .then(() => {

               fixture = TestBed.createComponent(HomeComponent);
               component = fixture.componentInstance;
               el = fixture.debugElement;
               courseService = TestBed.inject(CoursesService);

             });
    })
  );

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    courseService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    expect(tabs.length).withContext('Unexpected number of tabs').toBe(1);

    const beginnersTabTitle = tabs[0].query(By.css('.mdc-tab__text-label'));

    expect(beginnersTabTitle.nativeElement.textContent).toBe('Beginners');

  });


  it("should display only advanced courses", () => {

    courseService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    expect(tabs.length).withContext('Unexpected number of tabs').toBe(1);

    const advancedTabTitle = tabs[0].query(By.css('.mdc-tab__text-label'));

    expect(advancedTabTitle.nativeElement.textContent).toBe('Advanced');

  });


  it("should display both tabs", () => {

    courseService.findAllCourses.and.returnValue(of(allCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    expect(tabs.length).withContext('Unexpected number of tabs').toBe(2);

  });


  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

    courseService.findAllCourses.and.returnValue(of(allCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));


    click(tabs[1]);

    fixture.detectChanges();

    flush();

    const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));

    expect(cardTitles.length).withContext('Could not find card titles').toBeGreaterThan(0);

    expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');

  }));

  it("should display advanced courses when tab clicked - waitForAsync", waitForAsync(() => {

    courseService.findAllCourses.and.returnValue(of(allCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab'));

    click(tabs[1]);

    fixture.detectChanges();

    fixture.whenStable().then(() => {

      const cardTitles = el.queryAll(By.css('.mat-mdc-tab-body-active .mat-mdc-card-title'));

      expect(cardTitles.length).withContext('Could not find card titles').toBeGreaterThan(0);

      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');

    });

  }));

});


