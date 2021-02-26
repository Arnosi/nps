import { EntityRepository, Repository } from "typeorm";

import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {
  static findOne(arg0: { where: ({ user_id: string; } | { value: null; })[]; relations: string[]; }) {
    throw new Error("Method not implemented.");
  }
}

export { SurveysUsersRepository };
