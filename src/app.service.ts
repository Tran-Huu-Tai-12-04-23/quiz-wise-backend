import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { coreHelper } from './helpers';

type CompanyInfoDTO = {
  nameCompany: string;
  taxCode: string;
  address: string;
  logo: string;
  phoneNumber: string;
  description: string;
  email: string;
  representative: string;
};

@Injectable()
export class AppService {
  /** check status of server */
  healthCheck() {
    return 'This server is healthy. - update v1 at 23:127PM deploy CI/CD';
  }

  /** check time by timezone of server */
  checkTimeZone() {
    const newDate = new Date();
    const newDateTz = coreHelper.newDateTZ();

    return `newDate: ${newDate}\nnewDateTZ+7: ${newDateTz}`;
  }

  /** waiting for 30min */
  delay(ms = 1800000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Đợi chờ là hạnh phúc.');
      }, ms);
    });
  }

  /// crawler data

  async crawlerData(majorCode: string): Promise<CompanyInfoDTO[]> {
    const lstLinkToCrawl: any = {
      '484645':
        'https://trangvangvietnam.com/categories/484645/logistics-dich-vu-logistics.html',
      '246160':
        'https://trangvangvietnam.com/categories/246160/van-tai-cong-ty-van-tai-va-dai-ly-van-tai.html',
      '419935':
        'https://trangvangvietnam.com/categories/419935/chuyen-phat-nhanh-cong-ty-chuyen-phat-nhanh.html',
      '31960':
        'https://trangvangvietnam.com/categories/31960/oc-vit-bu-loong.html',
      '26360':
        'https://trangvangvietnam.com/categories/26360/vong-bi-bac-dan.html',
      '186010':
        'https://trangvangvietnam.com/categories/186010/bao-bi-nhua.html',
      '484507':
        'https://trangvangvietnam.com/categories/484507/bao-bi-giay.html',
      '191570':
        'https://trangvangvietnam.com/categories/191570/in-bao-bi-cong-ty-thiet-ke-va-in-an-bao-bi.html',
      '95260':
        'https://trangvangvietnam.com/categories/95260/moi-truong-cong-ty-moi-truong.html',
      '256610':
        'https://trangvangvietnam.com/categories/256610/xu-ly-nuoc-xu-ly-nuoc-thai-he-thong-xu-ly-nuoc-nuoc-thai.html',
      '112370':
        'https://trangvangvietnam.com/categories/112370/may-mac-cac-cong-ty-may-mac.html',
      '268180':
        'https://trangvangvietnam.com/categories/268180/may-dong-phuc-cong-ty-may-dong-phuc.html',
      '112350':
        'https://trangvangvietnam.com/categories/112350/may-mac-nguyen-phu-lieu-may-mac.html',
      '152060':
        'https://trangvangvietnam.com/categories/152060/co-khi--gia-cong-va-che-tao.html',
      '488209':
        'https://trangvangvietnam.com/categories/488209/co-khi-chinh-xac-gia-cong-chi-tiet-linh-kien-phu-tung-theo-yeu-cau.html',
      '159730': 'https://trangvangvietnam.com/categories/159730/khuon-mau.html',
    };
    const link = lstLinkToCrawl[majorCode];
    if (!link) {
      throw new Error('Major code not found');
    }
    const url = link + '?page=';
    const lstCompanyData: CompanyInfoDTO[] = [];

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const page = $('#paging').find('a');
      const length = page.length;
      const firstPage = Number($(page[1]).text().trim());
      const lastPage = Number(
        $(page[length - 2])
          .text()
          .trim(),
      );

      // Fetch data from all pages concurrently
      for (let i = firstPage; i <= lastPage; i++) {
        const pageData = await this.fetchPageData(`${url}${i}`);
        lstCompanyData.push(...pageData);

        await setTimeout(() => {
          console.log(`fetching page ${i}`);
        }, 1000);
      }

      return lstCompanyData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async fetchPageData(pageUrl: string): Promise<CompanyInfoDTO[]> {
    const lstCompanyData: CompanyInfoDTO[] = [];

    try {
      const { data } = await axios.get(pageUrl);
      const $ = cheerio.load(data);

      console.log($(`.text-capitalize`).length);

      const detailPromises = $('.div_list_cty')
        .find(`.text-capitalize`)
        .map((_, item) => {
          const link = $(item).find('a').attr('href')?.toString();
          return link ? this.detailData(link) : null;
        })
        .get();

      const details = await Promise.all(detailPromises);
      details.forEach((detail) => {
        if (detail) lstCompanyData.push(detail);
      });

      console.log(lstCompanyData.length);
      return lstCompanyData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async detailData(link: string): Promise<CompanyInfoDTO | null> {
    try {
      const { data } = await axios.get(link);
      const dataDetail = cheerio.load(data);

      const companyInfo: CompanyInfoDTO = {
        nameCompany: '',
        taxCode: '',
        address: '',
        logo: '',
        phoneNumber: '',
        description: '',
        email: '',
        representative: '',
      };
      companyInfo.nameCompany = dataDetail('.text-capitalize').text().trim();
      const detailTree = dataDetail('#section4')
        .find('.pc_display')
        .find('.clearfix');

      companyInfo.taxCode = dataDetail(detailTree[detailTree.length - 3])
        .find('.div_77')
        .text()
        .trim();

      companyInfo.description = dataDetail('.gioithieucongty_img')
        .text()
        .trim();

      const summaryData = dataDetail('.logo_lisitng_address').find('div');
      companyInfo.phoneNumber = dataDetail(summaryData[1])
        .find('a')
        .text()
        .trim();

      companyInfo.email = dataDetail('.email_link').find('a').text().trim();
      companyInfo.logo =
        dataDetail('.logo_listing').find('img').attr('src')?.toString() || '';

      companyInfo.address = dataDetail(summaryData[0])
        .text()
        .trim()
        .replace('<span class="fw500">', '')
        .replace('</span>', '');
      return companyInfo;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
