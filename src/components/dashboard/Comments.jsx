import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input';
import { Send } from '@/lib/svg_icons';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useCreateCommentMutation, useCreateReplyMutation, useDeleteCommentMutation, useGetVideoCommentsQuery } from '@/store/Api/comments';
import { toast } from 'react-toastify';
import { LoaderCircle, Trash2 } from 'lucide-react';


const Comments = ({ videoId }) => {
    const { data, isLoading, error, refetch } = useGetVideoCommentsQuery(videoId);
    const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
    const [commentBody, setCommentBody] = useState("");

    const comments = data?.data?.comments || [];
    const handleCreateComment = async () => {
        if (!commentBody.trim()) return
        try {
            const res = await createComment({ body: { comment: commentBody }, videoId }).unwrap();
            if (res?.success) {
                setCommentBody("");
            }
            else {
                toast.error(res?.message)
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    return (
        <>
            <h1 className='text-lg font-semibold mb-6 '>{comments.length} Comments</h1>

            {/* <div className='relative my-4'>
                <Input
                    type="text"
                    value={commentBody}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleCreateComment();
                        }
                    }}
                    onChange={(e) => setCommentBody(e.target.value)}
                    className="px-4 py-3 rounded-3xl border border-gray-500" placeholder="Write Comments" />
                <div className='absolute right-5 top-2 cursor-pointer' onClick={handleCreateComment}>
                    <Send />
                </div>
            </div> */}

            <div className='flex flex-col gap-y-4 h-32 overflow-y-auto'>
                {
                    [...comments].reverse().map((items, i) => (
                        <Comment
                            key={i}
                            comment={items?.comment}
                            commentId={items?._id}
                            reply={items?.reply}
                            userName={items?.user?.name}
                            avatar={items?.user?.avatar}
                        />
                    ))
                }
            </div>
        </>
    )
}



const Comment = ({ comment, reply, userName, commentId, avatar }) => {
    const [createReply] = useCreateReplyMutation();
    const [showReplies, setShowReplies] = useState(false);
    const [addReply, setAddReply] = useState(false);
    const [replyBody, setReplyBody] = useState("");
    const inputRef = useRef(null);
    const [deleteComment, { isLoading }] = useDeleteCommentMutation();
    const src = !avatar ? "/prismatic.png" : avatar;

    // Scroll to input when addReply is true
    useEffect(() => {
        if (addReply || showReplies && inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [showReplies,addReply]);

    // Toggle replies visibility
    const toggleReplies = () => setShowReplies(!showReplies);

    const handleCreateReply = async () => {
        if (!replyBody.trim()) return
        try {
            const res = await createReply({ body: { reply: replyBody }, commentId }).unwrap();
            if (res?.success) {
                setReplyBody("");
                setAddReply(false);
            }
        } catch (error) {
            console.error("Error creating comment:", error);
            toast.error(error?.data?.message)
        }
    };
    const handleDeleteComment = async () => {
        try {
            const res = await deleteComment(commentId).unwrap();
        } catch (error) {
            console.error("Error creating comment:", error);
            toast.error(error?.data?.message)
        }
    };

    return (
        <div className="pb-3">
            {/* Comment Section */}
            <div className="group flex gap-x-14 ">
                <div className='flex gap-x-2'>
                    <div className="w-8 h-8 rounded-full bg-red-300 relative">
                        <Image
                            src={src}
                            alt="user pic"
                            fill
                            style={{ borderRadius: "100%", objectFit: "cover" }}
                        />
                    </div>

                    <div>
                        <p className="text-[10px] text-gray-300">{userName}</p>
                        <p className="text-xs mb-1 font-semibold">{comment}</p>

                        <div className='flex gap-x-3 items-center'>

                            <div onClick={() => setAddReply(!addReply)}>
                                <p className='text-yellow-400 text-[10px] font-semibold cursor-pointer'>Reply</p>
                            </div>

                            {
                                reply &&
                                (
                                    <div className=" mt-[2px]">
                                        <p
                                            className="text-[var(--neon-purple)] text-[10px] font-semibold cursor-pointer "
                                            onClick={toggleReplies}
                                        >
                                            {showReplies ? "Hide Replies" : `View Replies`}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleDeleteComment}
                    className='text-red-600 cursor-pointer hidden group-hover:block'>
                    {isLoading ? <LoaderCircle className='animate-spin !h-5 !w-5' /> : <Trash2 size={18} />}
                </button>
            </div>


            {/* Replies Section (Animated) */}
            <AnimatePresence>
                {showReplies && (
                    <motion.div
                        ref={inputRef}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.4 }}
                        className="my-2 overflow-hidden "
                    >
                        <div className="flex gap-x-2">
                            <div className="w-8 h-8 rounded-full bg-red-300 relative">
                                <Image
                                    src="/thumbnail3.png"
                                    alt="user"
                                    fill
                                    style={{ borderRadius: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <p className="text-[10px] text-gray-300">Ravallusion</p>
                                <p className="text-xs text-gray-100 ">
                                    {reply}
                                </p>
                            </div>

                        </div>

                    </motion.div>
                )}
            </AnimatePresence>




          {/* Reply input */}
            <AnimatePresence>
                {
                    addReply &&
                    <motion.div
                        ref={inputRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.4 }}
                        className="relative my-4 w-full md:w-96"
                    >
                        <Input
                            type="text"
                            value={replyBody}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleCreateReply();
                                }
                            }}
                            onChange={(e) => setReplyBody(e.target.value)}
                            className="px-4 py-3 rounded-3xl border border-gray-500 " placeholder="reply.." />
                        <div className='absolute right-5 top-2 cursor-pointer' onClick={handleCreateReply}>
                            <Send />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    );
};

export default Comments;

