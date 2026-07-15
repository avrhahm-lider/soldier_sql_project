import express from "express";
import service from "../service/soldier.js";
import { isId } from "../dal/soldiers.js";
import { idValidtion } from "../utils/utils.js";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await service.creatSoldier(req.body);
    res.status(result.status).json(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await service.getSoldier(req.query);
    res.status(result.status).json(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidtion(id)) return res.status(400).json({ message: "invalid id" });
    const result = await service.getByID(id);
    console.log(result);
    res.status(result.status).json(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidtion(id)) return res.status(400).json({ message: "invalid id" });
    const result = await service.deleteSoldier(id);
    console.log(result);
    res.status(result.status).json(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidtion(id)) return res.status(400).json({ message: "invalid id" });
    const result = await service.updateSoldier(id, req.body);
    res.status(result.status).json(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    if (!idValidtion(id)) return res.status(400).json({ message: "invalid id" });
    const result = await service.updateStatus(id, req.body);
    res.status(result.status).json(result.data);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});
export default router