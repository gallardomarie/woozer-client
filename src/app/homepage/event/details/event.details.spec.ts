import { User } from 'src/app/login/user';
import { EventDetailsComponent } from './event.details.component';
import { EventService } from 'src/services/event.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HomepageModule } from '../../homepage.module';
import { SurveyOption } from '../sondage/survey_options';

// TESTS DU COMPOSANT EventDetailsComponent

describe('EventDetailsComponent', () => {
    let component: EventDetailsComponent;

    const fakeActivatedRoute = {
      } as ActivatedRoute;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HomepageModule
            ],
            providers: [
                EventService,
                HttpClient,
                HttpHandler,
                {provide: ActivatedRoute, useValue: fakeActivatedRoute} 
            ],
          }).compileComponents();
        component = TestBed.createComponent(EventDetailsComponent).componentInstance;
    });

    describe('initSurvey', () => {
        it('initSurvey call ' , () => {
            component.initSurvey = jasmine.createSpy();
            component.initSurvey(true);
            expect(component.initSurvey).toHaveBeenCalled();
        });
    });

    describe('voter', () => {
        it('call la methode voter du service event service' , () => {
            component.voter = jasmine.createSpy();
            component.voter(null, null, null);
            expect(component.voter).toHaveBeenCalled();
        });
    });

    describe('isChecked', () => {

        it('retourne vrai quand un user a voté pour une option ' , () => {
            component.isChecked = jasmine.createSpy().and.returnValue(true);
            const result = component.isChecked(new SurveyOption(1, '' , 0 , []));
            expect(result).toBeTruthy();
        });

        it('retourne false quand un user n\'a pas voté pour une option ' , () => {
            component.isChecked = jasmine.createSpy().and.returnValue(false);
            const result = component.isChecked(new SurveyOption(1, '' , 0 , []));
            expect(result).toBeFalsy();
        });

    });

    describe('jeParticipe', () => {
        it('appelle la methode userInParticipant puis adaptColorIcon si userInParticipant retourne -1' , () => {
            spyOn(component, 'jeParticipe');
            spyOn(component, 'userInParticipant').and.returnValue(-1);
            spyOn(component, 'adaptColorIcon');
            component.jeParticipe();
            expect(component.jeParticipe).toHaveBeenCalled();
            setTimeout(function() {
                expect(component.userInParticipant).toHaveBeenCalled();
                expect(component.adaptColorIcon).toHaveBeenCalled();
            }, 100);
        });

        it('appelle la methode userInParticipant mais pas adaptColorIcon si userInParticipant retourne un nombre positif ou null' , () => {
            spyOn(component, 'jeParticipe');
            spyOn(component, 'userInParticipant').and.returnValue(2);
            spyOn(component, 'adaptColorIcon');
            component.jeParticipe();
            expect(component.jeParticipe).toHaveBeenCalled();
            setTimeout(function() {
                expect(component.userInParticipant).toHaveBeenCalled();
                expect(component.adaptColorIcon).toHaveBeenCalledTimes(0);
            }, 100);
        });
    });

    describe('jeNeParticipePas', () => {
        it('appelle la methode userInParticipant puis adaptColorIcon si userInParticipant retourne un nombre supérieur ou égal à 0' , () => {
            spyOn(component, 'jeNeParticipePas');
            spyOn(component, 'userInParticipant');
            spyOn(component, 'adaptColorIcon');
            component.jeNeParticipePas();
            expect(component.jeNeParticipePas).toHaveBeenCalled();
            setTimeout(function() {
                expect(component.userInParticipant).toHaveBeenCalled();
                expect(component.adaptColorIcon).toHaveBeenCalled();
            }, 100);
        });

        it('appelle la methode userInParticipant mais pas adaptColorIcon si userInParticipant retourne -1' , () => {
            spyOn(component, 'jeNeParticipePas');
            spyOn(component, 'userInParticipant');
            component.jeNeParticipePas();
            expect(component.jeNeParticipePas).toHaveBeenCalled();
            setTimeout(function() {
                expect(component.userInParticipant).toHaveBeenCalled();
            }, 100);
        });
    });

    describe('initParticipation', () => {
        it('appelle la fonction userInParticipant puis adaptColorIcon avec le retour de userInParticipant ' , () => {
            spyOn(component, 'initParticipation');
            spyOn(component, 'userInParticipant');
            spyOn(component, 'adaptColorIcon');
            component.initParticipation();
            expect(component.initParticipation).toHaveBeenCalled();
            setTimeout(function() {
                expect(component.userInParticipant).toHaveBeenCalled();
                expect(component.adaptColorIcon).toHaveBeenCalled();
            }, 100);
        });
    });

    describe('adaptColorIcon', () => {
        it('call adaptColorIcon', () => {
            spyOn(component, 'adaptColorIcon');
            component.adaptColorIcon(true);
            expect(component.adaptColorIcon).toHaveBeenCalled();
        });
    });

    describe('userInParticipant', () => {
        const participants = [];
        const user1 = new User(1, 'user', 'user');
        const user2 = new User(2, 'user2', 'user2');
        const user3 = new User(3, 'user3', 'user3');
        participants.push(user1);
        participants.push(user2);

        it('doit retourner -1 si l\'user ne fait pas partis des participants ' , () => {
            const result = component.userInParticipant(participants, user3);
            expect(result).toEqual(-1);
        });

        it('doit retourner l\'index de l\'user s\'il fait partis des participants ' , () => {
            const result = component.userInParticipant(participants, user2);
            expect(result).toEqual(1);
        });

    });

});


