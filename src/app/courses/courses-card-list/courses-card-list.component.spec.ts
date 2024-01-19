import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { CoursesCardListComponent } from './courses-card-list.component';
import { setupCourses } from '../common/setup-test-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;

  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }))

  it('should create the component', () => {
    expect(component).toBeTruthy();
    console.log(component);
  });

  it('should display the course list', () => {
    component.courses = setupCourses();

    fixture.detectChanges();

    const cards = el.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');
  });

  it('should display the first course', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];

    const card = el.query(By.css('.course-card:first-child')),
    title = card.query(By.css('.mat-mdc-card-title')),
    image = card.query(By.css('img'));

    expect(card).toBeTruthy('could not find course card');
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);

  });

});
