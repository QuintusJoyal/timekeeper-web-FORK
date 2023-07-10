import { useState } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { flatMap, throttle } from "lodash";
import { twMerge } from "tailwind-merge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/common";
import { getRoutePath } from "../utils";

const Navigation = ({ meta, className, ...props }) => {
  const navigate = useNavigate();

  const openValues = useMemo(() => {
    return meta.reduce((acc, l1) => [...acc, getRoutePath(l1), ...flatMap(l1.pages, (l2) => getRoutePath(l1, l2))], []);
  }, [meta]);

  const [current, setCurrent] = useState(getRoutePath(meta[0]));

  const onSelect = throttle(
    (value) => {
      setCurrent(value);
      navigate(`/docs/${value}`);
    },
    100,
    {
      leading: true,
      trailing: false
    }
  );

  return (
    <nav className={twMerge("w-fuil h-full px-3.5 py-3", className)} {...props}>
      <Accordion type="multiple" collapsible="true" className="w-full" defaultValue={openValues}>
        {meta.map((l1) => {
          const l1Value = getRoutePath(l1);
          return (
            <AccordionItem key={l1Value} value={l1Value} onSelect={onSelect}>
              <AccordionTrigger chevron={!!l1.pages?.length} value={l1Value} selectedValue={current}>
                {l1.name}
              </AccordionTrigger>
              {l1.pages?.length ? (
                <AccordionContent>
                  {l1.pages.map((l2) => {
                    const l2Value = getRoutePath(l1, l2);
                    return (
                      <AccordionItem key={l2Value} value={l2Value} onSelect={onSelect} className="pl-3">
                        <AccordionTrigger value={l2Value} selectedValue={current}>
                          {l2.name}
                        </AccordionTrigger>
                        {l2.pages?.length ? (
                          <AccordionContent>
                            {l2.pages.map((l3) => {
                              const l3Value = getRoutePath(l1, l2, l3);
                              return (
                                <AccordionItem key={l3Value} value={l3Value} onSelect={onSelect} className="pl-3">
                                  <AccordionTrigger
                                    chevron={!!l3.pages?.length}
                                    value={l3Value}
                                    selectedValue={current}
                                  >
                                    {l3.name}
                                  </AccordionTrigger>
                                </AccordionItem>
                              );
                            })}
                          </AccordionContent>
                        ) : null}
                      </AccordionItem>
                    );
                  })}
                </AccordionContent>
              ) : null}
            </AccordionItem>
          );
        })}
      </Accordion>
    </nav>
  );
};

export default Navigation;
