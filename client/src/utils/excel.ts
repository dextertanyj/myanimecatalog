import Excel from 'exceljs';
import moment from 'moment';
import { Series } from '../gql/documents';
import {
  renderDuration,
  renderSeason,
  renderSource,
  renderStatus,
  renderType,
} from './enumRender';

const seriesFill = 'f2f2f2';
const episodeFill = 'b7dee8';
const fileFill = 'd8e4bc';

export const generateExcel = async (data: Series[]): Promise<Blob> => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Exported');
  for (let i = 1; i < 11; i++) {
    worksheet.getColumn(i).width = 15;
    worksheet.getColumn(i).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
  }
  let currentRow = 1;
  for (const series of data) {
    const seriesStartRow = currentRow;
    worksheet.getRow(currentRow).getCell(1).value = 'Title';
    worksheet.mergeCells(currentRow, 2, currentRow, 10);
    worksheet.getRow(currentRow).getCell(2).value = series.title ?? '';
    currentRow++;
    if (series.alternativeTitles) {
      for (const altTitle of series.alternativeTitles) {
        if (altTitle) {
          worksheet.getRow(currentRow).getCell(1).value = 'Alt Title';
          worksheet.mergeCells(currentRow, 2, currentRow, 10);
          worksheet.getRow(currentRow).getCell(2).value = altTitle?.title ?? '';
          currentRow++;
        }
      }
    }
    worksheet.getRow(currentRow).getCell(1).value = 'Season No.';
    worksheet.getRow(currentRow).getCell(2).value = series.seasonNumber ?? '';
    worksheet.getRow(currentRow).getCell(3).value = 'No. of Ep.';
    worksheet.getRow(currentRow).getCell(4).value = series.episodeCount ?? '';
    worksheet.getRow(currentRow).getCell(5).value = 'Status';
    worksheet.getRow(currentRow).getCell(6).value =
      (series.status && renderStatus(series.status)) ?? '';
    worksheet.getRow(currentRow).getCell(7).value = 'Type';
    worksheet.getRow(currentRow).getCell(8).value =
      (series.type && renderType(series.type)) ?? '';
    worksheet.getRow(currentRow).getCell(9).value = 'Release Date';
    worksheet.getRow(currentRow).getCell(10).value =
      `${series.releaseSeason && renderSeason(series.releaseSeason)} ${moment(
        series.releaseYear
      ).format('YYYY')}` ?? '';
    currentRow++;
    if (series.references) {
      for (const reference of series.references) {
        if (reference) {
          worksheet.getRow(currentRow).getCell(1).value = 'Source';
          worksheet.getRow(currentRow).getCell(2).value =
            reference?.source ?? '';
          worksheet.getRow(currentRow).getCell(3).value = 'Link';
          worksheet.mergeCells(currentRow, 4, currentRow, 10);
          worksheet.getRow(currentRow).getCell(4).value = reference.link ?? '';
          currentRow++;
        }
      }
    }
    if (series.prequels && series.prequels.length > 0) {
      worksheet.getRow(currentRow).getCell(1).value = 'Prequels';
      worksheet.mergeCells(currentRow, 2, currentRow, 10);
      let text = '';
      for (const other of series.prequels) {
        text += `; ${other?.title}`;
      }
      worksheet.getRow(currentRow).getCell(2).value = text.slice(2);
      currentRow++;
    }
    if (series.sequels && series.sequels.length > 0) {
      worksheet.getRow(currentRow).getCell(1).value = 'Sequels';
      worksheet.mergeCells(currentRow, 2, currentRow, 10);
      let text = '';
      for (const other of series.sequels) {
        text += `; ${other?.title}`;
      }
      worksheet.getRow(currentRow).getCell(2).value = text.slice(2);
      currentRow++;
    }
    if (series.mainStories && series.mainStories.length > 0) {
      worksheet.getRow(currentRow).getCell(1).value = 'Main Story';
      worksheet.mergeCells(currentRow, 2, currentRow, 10);
      let text = '';
      for (const other of series.mainStories) {
        text += `; ${other?.title}`;
      }
      worksheet.getRow(currentRow).getCell(2).value = text.slice(2);
      currentRow++;
    }
    if (series.sideStories && series.sideStories.length > 0) {
      worksheet.getRow(currentRow).getCell(1).value = 'Side Stories';
      worksheet.mergeCells(currentRow, 2, currentRow, 10);
      let text = '';
      for (const other of series.sideStories) {
        text += `; ${other?.title}`;
      }
      worksheet.getRow(currentRow).getCell(2).value = text.slice(2);
      currentRow++;
    }
    if (
      (series.relatedAlternatives && series.relatedAlternatives.length > 0) ||
      (series.relatedSeries && series.relatedSeries.length > 0)
    ) {
      worksheet.getRow(currentRow).getCell(1).value = 'Related';
      worksheet.mergeCells(currentRow, 2, currentRow, 10);
      let text = '';
      if (series.relatedAlternatives) {
        for (const other of series.relatedAlternatives) {
          text += `; ${other?.title}`;
        }
      }
      if (series.relatedSeries) {
        for (const other of series.relatedSeries) {
          text += `; ${other?.title}`;
        }
      }
      worksheet.getRow(currentRow).getCell(2).value = text.slice(2);
      currentRow++;
    }
    worksheet.getRow(currentRow).getCell(1).value = 'Remarks';
    worksheet.mergeCells(currentRow, 2, currentRow, 10);
    worksheet.getRow(currentRow).getCell(2).value = series.remarks ?? '';
    for (let i = currentRow; i >= seriesStartRow; i--) {
      for (let j = 1; j < 11; j++) {
        worksheet.getCell(i, j).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: seriesFill },
        };
      }
    }
    currentRow += 2;
    if (series.episodes && series.episodes.length > 0) {
      for (const episode of series.episodes) {
        if (episode) {
          const episodeStartRow = currentRow;
          worksheet.getRow(currentRow).getCell(1).value = 'Episode No.';
          worksheet.getRow(currentRow).getCell(2).value =
            episode.episodeNumber ?? '';
          worksheet.getRow(currentRow).getCell(3).value = 'Episode Title';
          worksheet.mergeCells(currentRow, 4, currentRow, 10);
          worksheet.getRow(currentRow).getCell(4).value = episode.title ?? '';
          currentRow++;
          if (episode.alternativeTitles) {
            for (const altTitle of episode.alternativeTitles) {
              if (altTitle) {
                worksheet.getRow(currentRow).getCell(1).value = 'Alt Title';
                worksheet.mergeCells(currentRow, 2, currentRow, 10);
                worksheet.getRow(currentRow).getCell(2).value =
                  altTitle?.title ?? '';
                currentRow++;
              }
            }
          }
          worksheet.getRow(currentRow).getCell(1).value = 'Remarks';
          worksheet.mergeCells(currentRow, 2, currentRow, 10);
          worksheet.getRow(currentRow).getCell(2).value = episode.remarks ?? '';
          for (let i = currentRow; i >= episodeStartRow; i--) {
            for (let j = 1; j < 11; j++) {
              worksheet.getCell(i, j).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: episodeFill },
              };
            }
          }
          currentRow += 2;
          if (episode.files && episode.files.length > 0) {
            for (const file of episode.files) {
              if (file) {
                const fileStartRow = currentRow;
                worksheet.getRow(currentRow).getCell(1).value = 'File Path';
                worksheet.mergeCells(currentRow, 2, currentRow, 10);
                worksheet.getRow(currentRow).getCell(2).value = file.path ?? '';
                currentRow++;
                worksheet.getRow(currentRow).getCell(1).value = 'Size';
                worksheet.getRow(currentRow).getCell(2).value =
                  file.fileSize ?? '';
                worksheet.getRow(currentRow).getCell(5).value = 'Checksum';
                worksheet.getRow(currentRow).getCell(6).value =
                  file.fileSize ?? '';
                worksheet.getRow(currentRow).getCell(9).value = 'Duration';
                worksheet.getRow(currentRow).getCell(10).value =
                  (file.duration && renderDuration(file.duration)) ?? '';
                currentRow++;
                worksheet.getRow(currentRow).getCell(1).value = 'Resolution';
                worksheet.getRow(currentRow).getCell(2).value =
                  file.resolutionWidth + ' × ' + file.resolutionHeight ?? '';
                worksheet.getRow(currentRow).getCell(5).value = 'Source';
                worksheet.getRow(currentRow).getCell(6).value =
                  (file.source && renderSource(file.source)) ?? '';
                worksheet.getRow(currentRow).getCell(9).value = 'Codec';
                worksheet.getRow(currentRow).getCell(10).value =
                  file.codec ?? '';
                for (let i = currentRow; i >= fileStartRow; i--) {
                  for (let j = 1; j < 11; j++) {
                    worksheet.getCell(i, j).fill = {
                      type: 'pattern',
                      pattern: 'solid',
                      fgColor: { argb: fileFill },
                    };
                  }
                }
                currentRow += 2;
              }
            }
          }
        }
      }
    }
    currentRow -= 2;
    for (let i = 1; i < 11; i++) {
      worksheet.getCell(currentRow, i).border = {
        bottom: { style: 'thick' },
      };
      worksheet.getCell(seriesStartRow, i).border = {
        top: { style: 'thick' },
      };
    }
    for (let i = currentRow; i >= seriesStartRow; i--) {
      worksheet.getCell(i, 1).border = {
        left: { style: 'thick' },
      };
      worksheet.getCell(i, 10).border = {
        right: { style: 'thick' },
      };
    }
    worksheet.getCell(currentRow, 1).border = {
      bottom: { style: 'thick' },
      left: { style: 'thick' },
    };
    worksheet.getCell(currentRow, 10).border = {
      bottom: { style: 'thick' },
      right: { style: 'thick' },
    };
    worksheet.getCell(seriesStartRow, 1).border = {
      top: { style: 'thick' },
      left: { style: 'thick' },
    };
    worksheet.getCell(seriesStartRow, 10).border = {
      top: { style: 'thick' },
      right: { style: 'thick' },
    };
    currentRow += 2;
  }
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer]);
};
