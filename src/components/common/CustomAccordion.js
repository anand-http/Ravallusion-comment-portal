import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const CustomAccordion = ({ list }) => {
  return (
    <Accordion
      type="single"
      className="bg-[var(--card)] px-4 pb-1 rounded-xl"
      collapsible
    >
      {list.map((item, idx) => (
        <AccordionItem
          key={item._id}
          value={item._id}
          className={
            "border-gray-700 " + (idx === list.length - 1 ? "border-none" : "")
          }
        >
          <AccordionTrigger className="text-lg 2xl:text-xl hover:no-underline accordion-custom-trigger [&[data-state=open]>.accordion-plus]:hidden [&[data-state=closed]>.accordion-minus]:hidden">
            <div className="max-w-[92%]"> {item.title}</div>
            <Plus
              size={17}
              color="rgba(254, 177, 121, 1)"
              className=" accordion-plus duration-1000"
            />
            <Minus
              size={17}
              color="rgba(254, 177, 121, 1)"
              className=" accordion-minus duration-1000"
            />
          </AccordionTrigger>
          <AccordionContent className="text-xs 2xl:text-sm text-[var(--light-gray)] max-w-[92%]">
            {item.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
