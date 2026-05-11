import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import api from "@/api/api";

export function DeleteStudentDialog({
    id,
    isOpen,
    onOpenChange,
}: {
    id: number;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const handleDelete = async () => {
        try {
            // ⚠️ Your backend route is a GET – see note below
            await api.delete(`/Campus/delete_student/${id}`);
            onOpenChange(false);
            // Optionally refresh the student list here (e.g. by calling a callback)
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Delete Student</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this student? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                {/* Form inside the content – using flex-end buttons */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleDelete();
                    }}
                >
                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="destructive">
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}