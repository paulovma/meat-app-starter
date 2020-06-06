import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

export class ErrorHandler {

    static handleError(error: Response | any) {
        let errorMessage: string;

        if (error instanceof HttpErrorResponse) {
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.error}`;
        } else {
            errorMessage = error.toString();
        }

        console.log(errorMessage);

        return Observable.throw(errorMessage);
    }

}
