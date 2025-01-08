import React from "react";
import { Table, TableBody, TableCaption,TableCell,TableHead, TableHeader,TableRow } from "./ui/table";
import { Button } from "./ui/button";

const AppliedJobTable = () => {

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Application</TableCaption>
        <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">Date</TableHead>
        <TableHead>Company</TableHead>
        <TableHead>Job Role</TableHead>
        <TableHead className="text-right">Status</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2,3,4].map((item,index)=>(
                    <TableRow>
                        <TableCell>23-12-24</TableCell>
                        <TableCell>Google</TableCell>
                        <TableCell>Software Developer</TableCell>
                        <TableCell className='text-right'><Button>accepted</Button></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
