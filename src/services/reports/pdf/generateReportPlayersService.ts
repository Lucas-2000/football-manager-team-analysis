import { PlayerProps } from "../../../entities/player";
import { PlayersRepository } from "../../../repositories/playersRepository";
import { TeamsRepository } from "../../../repositories/teamsRepository";
import { UsersRepository } from "../../../repositories/usersRepository";
import { PositionsRepository } from "../../../repositories/positionsRepository";
import { printer } from "../../../utils/config/pdfMake/pdfMakeConfig";
import { TDocumentDefinitions, TableCell } from "pdfmake/interfaces";
import fs from "fs";
import path from "path";

interface GenerateReportPlayersServiceRequest {
  userId: string;
  teamId: string;
}

type GenerateReportPlayersServiceResponse = Buffer;

export class GenerateReportPlayersService {
  constructor(
    private playersRepository: PlayersRepository,
    private usersRepository: UsersRepository,
    private teamsRepository: TeamsRepository,
    private positionsRepository: PositionsRepository
  ) {}

  async execute({
    userId,
    teamId,
  }: GenerateReportPlayersServiceRequest): Promise<GenerateReportPlayersServiceResponse> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found");

    const teamExists = await this.teamsRepository.findById(teamId);

    if (!teamExists) throw new Error("Team not found");

    const players = await this.playersRepository.findAllPlayersForUserAndTeam(
      userExists.id as string,
      teamExists.id as string
    );

    const playerSummaries: PlayerProps[] = players.map((player) =>
      player.getSummary()
    );

    const body: TableCell[][] = [];

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads

    const logoPath = teamExists.teamLogo
      ? path.join(uploadsFolder, teamExists.teamLogo)
      : path.join(uploadsFolder, "X.png");

    for await (const player of playerSummaries) {
      const position = await this.positionsRepository.findById(
        player.positionId
      );

      if (!position) throw new Error("Position not found");

      const positionSummary = position?.getSummary();
      const basePosition = positionSummary?.basePosition;

      const playerImagePath = player.playerImage
        ? path.join(uploadsFolder, player.playerImage)
        : path.join(uploadsFolder, "X.png");

      const imageData = fs.readFileSync(playerImagePath).toString("base64");

      const bodyRows: TableCell[] = [];
      bodyRows.push({
        image: "data:image/png;base64," + imageData,
        fit: [50, 50],
      });
      bodyRows.push(player.name);
      bodyRows.push(player.jersey);
      bodyRows.push(basePosition);
      bodyRows.push(player.birthdate);
      bodyRows.push(player.lenght);
      bodyRows.push(player.weight);

      body.push(bodyRows);
    }

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          columns: [
            {
              image: logoPath,
              fit: [100, 100],
            },
          ],
        },
        {
          columns: [
            {
              text: `Team ${teamExists.teamName} report`,
              style: "header",
              margin: [0, 20],
              alignment: "center",
            },
          ],
        },
        {
          table: {
            widths: ["*", "*", "*", "*", "*", "*", "*"],
            body: [
              [
                { text: "Image", style: "columnsTitle" },
                { text: "Name", style: "columnsTitle" },
                { text: "Jersey", style: "columnsTitle" },
                { text: "Position", style: "columnsTitle" },
                { text: "Birthdate", style: "columnsTitle" },
                { text: "Length", style: "columnsTitle" },
                { text: "Weight", style: "columnsTitle" },
              ],
              ...body,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        columnsTitle: {
          fontSize: 12,
          bold: true,
          fillColor: "#84e",
          color: "#fff",
          alignment: "center",
        },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });

      pdfDoc.on("error", (err) => {
        throw new Error("Error on generating pdf");
      });

      pdfDoc.end();
    });
  }
}
