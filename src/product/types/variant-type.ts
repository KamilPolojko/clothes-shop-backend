type TopSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

type ShoeSize =
  | '35'
  | '35 1/2'
  | '36'
  | '36 1/2'
  | '36 2/3'
  | '37'
  | '37 1/2'
  | '37 2/3'
  | '38'
  | '38 1/2'
  | '38 2/3'
  | '39'
  | '39 1/2'
  | '39 2/3'
  | '40'
  | '40 1/2'
  | '40 2/3'
  | '41'
  | '41 1/2'
  | '41 2/3'
  | '42'
  | '42 1/2'
  | '42 2/3'
  | '43'
  | '43 1/2'
  | '43 2/3'
  | '44'
  | '44 1/2'
  | '44 2/3'
  | '45'
  | '45 1/2'
  | '45 2/3'
  | '46'
  | '46 1/2'
  | '46 2/3'
  | '47'
  | '47 1/2'
  | '47 2/3'
  | '48'
  | '48 1/2'
  | '48 2/3'
  | '49'
  | '49 1/2'
  | '49 2/3'
  | '50'
  | '50 1/2'
  | '50 2/3';

type SizeQuantity = {
  [key in TopSize | ShoeSize]: number;
};

type ProductInfo = SizeQuantity & {
  photo: string;
};
type Variant = {
  [variant: string]: ProductInfo;
};

export default Variant;
