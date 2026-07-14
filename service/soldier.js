import db, { isId } from "../dal/soldiers.js";
import { Soldier, UpdateSoldier } from "../utils/zodValidtion.js";
import z from "zod";

async function creatSoldier(body) {
  const secc = Soldier.safeParse(body);
  if (!secc.success) return { status: 400, message: secc.error.issues[0] };
  const res = await db.creatSoldier(body);
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
  if (!(await isId(id))) return { status: 404, message: "soldier not found" };
  const soldier = await db.getByID(id);
  return { status: 200, data: soldier };
}

async function updateSoldier(id, body) {
  if (!(await isId(id))) return { status: 404, message: "soldier not found" };
  const secc = UpdateSoldier.safeParse(body);
  if (!secc.success) return { status: 400, message: secc.error.issues[0] };
  const res = db.updateSoldier(id, body);
}

async function deleteSoldier() {
  if (!(await isId(id))) return { status: 404, message: "soldier not found" };
  const res = await db.deleteByID(id);
  return { status: 200, data: res };
}

async function updateStatus(id, body) {
  if (!(await isId(id))) return { status: 404, message: "soldier not found" };
  const { status } = body;
  if (!status) if (!secc.success) return { status: 400, message: "invalid body" };
  const res = await db.updateStatus(id, status);
  return { status: 200, data: res };
}

export default {creatSoldier,getSoldier, getByID, updateSoldier, deleteSoldier,updateStatus }