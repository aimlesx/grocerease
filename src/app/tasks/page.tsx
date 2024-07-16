import { PrismaClient } from "@prisma/client";
import Tasklist from "./_components/tasklist";

const prisma = new PrismaClient();

const TasksPage = async () => {

    const tasklists = await prisma.tasklist.findMany({ include: { tasks: true }});

    return (
        <div className='p-8'>
            {tasklists.map(tl => <Tasklist key={tl.id} title={tl.title} tasks={tl.tasks} />)}
        </div>
    );
}

export default TasksPage;