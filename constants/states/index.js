import { ABIA } from "./abia";
import { ADAMAWA } from "./adamawa";
import { AKWAIBOM } from "./akwaibom";
import { ANAMBRA } from "./anambra";
import { BAUCHI } from "./bauchi";
import { BAYELSA } from "./bayelsa";
import { BENUE } from "./benue";
import { BORNO } from "./borno";
import { CROSSRIVERS } from "./crossrivers";
import { DELTA } from "./delta";
import { EBONYI } from "./ebonyi";
import { EDO } from "./edo";
import { EKITI } from "./ekiti";
import { ENUGU } from "./enugu";
import { FCT } from "./fct";
import { GOMBE } from "./gombe";
import { IMO } from "./imo";
import { JIGAWA } from "./jigawa";
import { KADUNA } from "./kaduna";
import { KANO } from "./kano";
import { KATSINA } from "./katsina";
import { KEBBI } from "./kebbi";
import { KOGI } from "./kogi";
import { KWARA } from "./kwara";
import { LAGOS } from "./lagos";
import { NASARAWA } from "./nasarawa";
import { NIGER } from "./niger";
import { OGUN } from "./ogun";
import { ONDO } from "./ondo";
import { OSUN } from "./osun";
import { OYO } from "./oyo";
import { PLATEAU } from "./plateau";
import { RIVERS } from "./rivers";
import { SOKOTO } from "./sokoto";
import { TARABA } from "./taraba";
import { YOBE } from "./yobe";
import { ZAMFARA } from "./zamfara";
import { ADMIN } from "./admin";

const states = [
  ABIA.states,
  ADAMAWA.states,
  AKWAIBOM.states,
  ANAMBRA.states,
  BAUCHI.states,
  BAYELSA.states,
  BENUE.states,
  BORNO.states,
  CROSSRIVERS.states,
  DELTA.states,
  EBONYI.states,
  EDO.states,
  EKITI.states,
  ENUGU.states,
  FCT.states,
  GOMBE.states,
  IMO.states,
  JIGAWA.states,
  KADUNA.states,
  KANO.states,
  KATSINA.states,
  KEBBI.states,
  KOGI.states,
  KWARA.states,
  LAGOS.states,
  NASARAWA.states,
  NIGER.states,
  OGUN.states,
  ONDO.states,
  OSUN.states,
  OYO.states,
  PLATEAU.states,
  RIVERS.states,
  SOKOTO.states,
  TARABA.states,
  YOBE.states,
  ZAMFARA.states,
];

const sr = [
  {
    name: "developer",
    email: "developer@apcaims.com",
    password: "agile",
    phone: "0910009202930292",
    statecode: "Developer",
    img: "string",
    userType: "DEV",
  },
  ABIA.SR,
  ADAMAWA.SR,
  AKWAIBOM.SR,
  ANAMBRA.SR,
  BAUCHI.SR,
  BAYELSA.SR,
  BENUE.SR,
  BORNO.SR,
  CROSSRIVERS.SR,
  DELTA.SR,
  EBONYI.SR,
  EDO.SR,
  EKITI.SR,
  ENUGU.SR,
  FCT.SR,
  GOMBE.SR,
  IMO.SR,
  JIGAWA.SR,
  KADUNA.SR,
  KANO.SR,
  KATSINA.SR,
  KEBBI.SR,
  KOGI.SR,
  KWARA.SR,
  LAGOS.SR,
  NASARAWA.SR,
  NIGER.SR,
  OGUN.SR,
  ONDO.SR,
  OSUN.SR,
  OYO.SR,
  PLATEAU.SR,
  RIVERS.SR,
  SOKOTO.SR,
  TARABA.SR,
  YOBE.SR,
  ZAMFARA.SR,
  ADMIN.SR,
];

const lgas = [
  ...ABIA.states.lga,
  ...ADAMAWA.states.lga,
  ...AKWAIBOM.states.lga,
  ...ANAMBRA.states.lga,
  ...BAUCHI.states.lga,
  ...BAYELSA.states.lga,
  ...BENUE.states.lga,
  ...BORNO.states.lga,
  ...CROSSRIVERS.states.lga,
  ...DELTA.states.lga,
  ...EBONYI.states.lga,
  ...EDO.states.lga,
  ...EKITI.states.lga,
  ...ENUGU.states.lga,
  ...FCT.states.lga,
  ...GOMBE.states.lga,
  ...IMO.states.lga,
  ...JIGAWA.states.lga,
  ...KADUNA.states.lga,
  ...KANO.states.lga,
  ...KATSINA.states.lga,
  ...KEBBI.states.lga,
  ...KOGI.states.lga,
  ...KWARA.states.lga,
  ...LAGOS.states.lga,
  ...NASARAWA.states.lga,
  ...NIGER.states.lga,
  ...OGUN.states.lga,
  ...ONDO.states.lga,
  ...OSUN.states.lga,
  ...OYO.states.lga,
  ...PLATEAU.states.lga,
  ...RIVERS.states.lga,
  ...SOKOTO.states.lga,
  ...TARABA.states.lga,
  ...YOBE.states.lga,
  ...ZAMFARA.states.lga,
];
const fedConst = [ABIA.fedral_constituency];
const senDist = [ABIA.senatorial_district];

// const lga = [...ABIA.states.lga, ...ADAMAWA.states.lga, AKWAIBOM.states.lga];
export const data = { states, sr, fedConst, senDist, lgas };
