import { STAR } from "./constants";
import { splitEmail } from "./utils";
// ------------------------------------------------------------------------------------------------------------
// 1. Write code that uploads an array of files to AWS S3
//
// You can assume that you have variables s3Client and serverApi are initialized and can do the actual requests.
// For uploading a file you need to first request an S3 path from server, after that push the file to S3 using
// the given path and then notify server again if the upload was succeesfull or not

interface S3Data {
  fileId: string;
  s3Path: string;
}

let s3Client: {
  uploadFile: (s3Path: string, file: File) => Promise<void>;
};
let serverApi: {
  prepareForUpload: (file: File) => Promise<S3Data>;
  markAsSucceeded: (fileId: string) => Promise<void>;
  markAsFailed: (fileId: string) => Promise<void>;
};

const getServerData = (file: File): Promise<S3Data> => {
  return serverApi.prepareForUpload(file);
};

// If there is fileId it will mark upload as succeesful
const checkUploadedFile = (fileId: string): void => {
  fileId ? serverApi.markAsSucceeded(fileId) : serverApi.markAsFailed(fileId);
};

async function uploadFiles(files: File[]): Promise<void> {
  files.forEach(async (file: File) => {
    const serverData = await getServerData(file);
    s3Client.uploadFile(serverData.s3Path, file);
    checkUploadedFile(serverData.fileId);
  });

  // Implement this method
  // You can add more methods if you want to
}

// ------------------------------------------------------------------------------------------------------------
// 2. Write a helper funtion that replaces user name from an email address with 3 stars except the last 3 characters
//
// For example john.doe@somecompany.com should become ***doe@somecompany.com etc

const maskEmail = (email: string): string => {
  const [userName, domain] = splitEmail(email);
  return STAR.repeat(3) + userName.slice(-3) + domain;
};

// ------------------------------------------------------------------------------------------------------------
// 3. Calculate totals to show in the UI
//
// You receive a list of companies and each company has property investments. On the UI you need to show the total
// investments per selected company, not all companies. Implement a method to calculate investments and define the
// interface for the return value so that it is easy to use in the UI.

interface Investment {
  date?: Date;
  sum: number;
  currency?: string;
}

interface Company {
  id: number;
  name: string;
  investments: Investment[];
}

// Implement this interface
interface InvestmentTotals {
  id: number;
  totalInvestments: number;
}

function calculateTotals(
  companies: Company[],
  selectedCompanyId: number = 1
): InvestmentTotals {
  return companies
    .map((company: Company) => {
      let investmentTotal: InvestmentTotals = {
        id: company.id,
        totalInvestments: company.investments.reduce(
          (total: number, investment: Investment) => total + investment.sum,
          0
        ),
      };
      return investmentTotal;
    })
    .find((company) => (company.id = selectedCompanyId));
}
