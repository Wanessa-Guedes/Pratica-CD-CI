import express, { json, Request, Response } from "express";
import prisma from "./database.js";

const app = express();
app.use(json());

app.get("/students", async (req: Request, res: Response) => {
  console.log('teste do pull request no github outra vez')
  console.log('2')
  console.log('3')
  console.log('4')
  console.log('5')
  const students = await prisma.student.findMany();
  res.send(students);
});

app.post("/students", async (req: Request, res: Response) => {
  const { students } = req.body;
  await prisma.student.createMany({
    data: students,
    skipDuplicates: true
  });

  res.sendStatus(201); // created
});

app.get("/students/random", async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();
  if (students.length > 0) {
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    res.send(randomStudent);
  } else {
    res.send({});
  }
});

export default app;