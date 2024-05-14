import { Router, Request, Response } from "express";
import { getLongestBreak, getLongestStreak } from "../handlers/insights";
import { getTotalActivities } from "../handlers/insights/get-total-activities";
import { getTotalDistance } from "../handlers/insights/get-total-distance";
import { getTotalDuration } from "../handlers/insights/get-total-duration";
const insightsRouter = Router();

insightsRouter.get(
  "/find-longest-streak",
  async (req: Request, res: Response) => {
    try {
      const result = await getLongestStreak();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

insightsRouter.get(
  "/find-longest-break",
  async (req: Request, res: Response) => {
    try {
      const result = await getLongestBreak();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

insightsRouter.get("/find-total-activities", async (req: Request, res: Response) => {
  try {
    const { startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res.status(400).json({ error: "startMonth, endMonth, and year are required" });
    }

    const totalActivities = await getTotalActivities(
      Number(startMonth),
      Number(endMonth),
      Number(year)
    );
    
    if (totalActivities !== null) {
      return res.status(200).json({ totalActivities });
    } else {
      return res.status(500).json({ error: "Failed to fetch total activities from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

insightsRouter.get("/find-total-distance", async (req: Request, res: Response) => {
  try {
    const { startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res.status(400).json({ error: "startMonth, endMonth, and year are required" });
    }

    const totalDistance = await getTotalDistance(
      Number(startMonth),
      Number(endMonth),
      Number(year)
    );

    if (totalDistance !== null) {
      return res.status(200).json({ totalDistance });
    } else {
      return res.status(500).json({ error: "Failed to fetch total distance from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

insightsRouter.get("/find-total-duration", async (req: Request, res: Response) => {
  try {
    const { startMonth, endMonth, year } = req.query;

    if (!startMonth || !endMonth || !year) {
      return res.status(400).json({ error: "startMonth, endMonth, and year are required" });
    }

    const totalDuration = await getTotalDuration(
      parseInt(startMonth as string),
      parseInt(endMonth as string),
      parseInt(year as string)
    );

    if (totalDuration !== null) {
      return res.status(200).json({ totalDuration });
    } else {
      return res.status(500).json({ error: "Failed to fetch total duration from database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default insightsRouter;