import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {
  /* CALCULO DO NPS
 * 1 2 3 4 5 6 7 8 9 10
   DETRATORES: 0-6
   PASSIVOS: 7-8
   PROMOTORES: 9-10

 * FÓRMULA: (PROMOTORES -  DETRATORES) / (RESPONDENTES) * 100 === NPS.
 */
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveyUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveyUsers.filter(
      (survey) => survey.value >= 9 && survey.value <=10
    ).length;

    const passives = surveyUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveyUsers.length;

    const calc = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));

    return response.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps: calc,
    })
  }
}

export { NpsController };
