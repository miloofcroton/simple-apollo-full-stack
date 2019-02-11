import { FallbackFunctional } from './Fallback';
import Paragraph from './Paragraph';
import Gif from './Gif';

export const LoadingParagraph = FallbackFunctional(Paragraph);

export const LoadingGif = FallbackFunctional(Gif);
