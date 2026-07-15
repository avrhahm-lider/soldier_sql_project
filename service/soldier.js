import db, { isId } from "../dal/soldiers.js";
import { Soldier, UpdateSoldier } from "../utils/zodValidtion.js";
import z from "zod";

async function creatSoldier(body) {
  const secc = Soldier.safeParse(body);
  if (!secc.success)
    return { status: 400, data: { message: secc.error.issues[0].message } };
  console.log(secc);

  const res = await db.creatSoldier(secc.data);
  return { status: 200, data: res };
}

async function getSoldier(qp) {
  const options = ["unit", "rank", "status"];
  let getBy = "";
  for (let i = 0; i < 3; i++) {
    if (qp[options[i]]) getBy += `${options[i]}=${qp[options[i]]}`;
  }
  const soldier = await db.getSoldier(getBy);
  return { status: 200, data: soldier };
}

async function getByID(id) {
  const isSoldier = await isId(id);
  if (!isSoldier[0][0]["count(*)"])
    return { status: 404, data: { message: "soldier not found" } };
  const soldier = await db.getByID(id);
  return { status: 200, data: soldier };
}

async function updateSoldier(id, body) {
  const isSoldier = await isId(id);
  if (!isSoldier[0][0]["count(*)"])
    return { status: 404, data: { message: "soldier not found" } };
  const secc = UpdateSoldier.safeParse(body);
  if (!secc.success) return { status: 400, data: { message: secc.error.issues[0] } };
  const res = await db.updateSoldier(id, secc.data);
  return { status: 200, data: res };
}

async function deleteSoldier(id) {
  const isSoldier = await isId(id);
  if (!isSoldier[0][0]["count(*)"])
    return { status: 404, data: { message: "soldier not found" } };
  const res = await db.deleteByID(+id);
  return { status: 200, data: res };
}

async function updateStatus(id, body) {
  const isSoldier = await isId(id);
  if (!isSoldier[0][0]["count(*)"])
    return { status: 404, data: { message: "soldier not found" } };
  const { status } = body;
  if (!status)
    return { status: 400, data: { message: "invalid body" } };
  const res = await db.updateStatus(id, status);
  return { status: 200, data: res };
}

export default {
  creatSoldier,
  getSoldier,
  getByID,
  updateSoldier,
  deleteSoldier,
  updateStatus,
};
