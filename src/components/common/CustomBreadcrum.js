"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const CustomBreadcrum = ({ list }) => {
  const length = list.length;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {list.map((item, i) => (
          <div key={item.name} className="flex items-center gap-3">
            <BreadcrumbItem className="text-sm">
              <BreadcrumbLink asChild={true}>
                <Link
                  href={item.link}
                  className={`hover:text-white ${
                    i === length - 1 &&
                    "text-[var(--yellow)] hover:text-[var(--yellow)]"
                  } `}
                >
                  {item.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i !== length - 1 && <BreadcrumbSeparator className="text-white" />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrum;
