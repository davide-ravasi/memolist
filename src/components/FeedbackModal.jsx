import React, { useEffect } from 'react';

const FeedbackModal = ({feedbackMsg, error, callBackAction}) => {

    useEffect(() => {
        if(typeof callBackAction === 'function') {
            callBackAction()
        }
    },[callBackAction])

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${!error && !feedbackMsg && 'hidden'} `}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-green-800 shadow-xl rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-green-600 px-4 pt-4 pb-4 sm:p-4 sm:pb-4">
                    <div className="sm:flex sm:items-start sm:justify-center">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="mt-2">
                        <p className="text-sm text-white">
                            {feedbackMsg}
                            {error}
                            {error && error.name} {error && error.code}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
)
}

export default FeedbackModal;