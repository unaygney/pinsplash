"use client";

import { updateDownloadCount } from "./actions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function UserDetails({
  photo,
  name,
  id,
  downloadUrl,
}: {
  id: string;
  photo: string;
  name: string;
  downloadUrl: string;
}) {
  const downloadImage = async (url: string, width: string, height: string) => {
    const res = await updateDownloadCount(url, width, height);
    if (res) {
      window.open(res, "_blank");
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage className="" src={photo} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <span className="text-base font-semibold leading-6 text-neutral-900">
          {name}
        </span>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button>
            Download
            <ArrowDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="flex max-w-[229px] flex-col gap-2 p-2"
        >
          <Button
            variant="outline"
            className="items-start justify-start gap-1 border-none"
            onClick={() => downloadImage(downloadUrl, "640", "426")}
          >
            Small{" "}
            <span className="text-sm font-normal leading-5 text-neutral-600">
              {" "}
              (640 x 426)
            </span>
          </Button>
          <Button
            variant="outline"
            className="items-start justify-start gap-1 border-none"
            onClick={() => downloadImage(downloadUrl, "1920", "1080")}
          >
            Medium{" "}
            <span className="text-sm font-normal leading-5 text-neutral-600">
              {" "}
              (1920 x 1080)
            </span>
          </Button>
          <Button
            variant="outline"
            className="items-start justify-start gap-1 border-none"
            onClick={() => downloadImage(downloadUrl, "2400", "1600")}
          >
            Large{" "}
            <span className="text-sm font-normal leading-5 text-neutral-600">
              {" "}
              (2400 x 1600)
            </span>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
