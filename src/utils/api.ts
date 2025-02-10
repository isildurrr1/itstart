import { IMainApiOptions, SeminarType } from "../types/types";

class MainApi {
  private baseUrl: string;

  constructor(options: IMainApiOptions) {
    this.baseUrl = options.baseUrl;
  }

  private _checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  public getSeminars(): Promise<SeminarType[]> {
    return fetch(this.baseUrl).then((res) =>
      this._checkResponse<SeminarType[]>(res)
    );
  }

  public deleteSeminar(id: string): Promise<SeminarType> {
    return fetch(`${this.baseUrl}${id}`, {
      method: "DELETE",
    }).then((res) => this._checkResponse<SeminarType>(res));
  }

  public editSeminar(
    id: string,
    updatedData: SeminarType
  ): Promise<SeminarType> {
    return fetch(`${this.baseUrl}${id}`, {
      method: "PUT", 
      body: JSON.stringify(updatedData), 
    }).then((res) => this._checkResponse<SeminarType>(res));
  }
}

export const mainApi = new MainApi({
  baseUrl: "http://localhost:5000/seminars/",
});
