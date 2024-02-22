import { FocusHomeStack } from '../modules/home/handlers/routes';
import { FocusObjectiveStack } from '../modules/objectives/handlers/routes';
  
export const FocusStack = [
  ...FocusHomeStack,
  ...FocusObjectiveStack
];
